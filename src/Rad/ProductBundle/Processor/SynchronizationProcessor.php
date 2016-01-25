<?php

namespace Rad\ProductBundle\Processor;

use Rad\MagentoConfigBundle\Entity\Category;
use Rad\MagentoConfigBundle\Entity\Country;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\ProductBundle\Entity\MagentoProduct;
use Rad\ProductBundle\Entity\Product;
use Rad\ProductBundle\Entity\ProductFieldTranslated;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class SynchronizationProcessor extends ContainerAware
{
    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    protected $manager;

    protected $data = array();
    protected $images = array();

    const DEBUG = false;

    public function process()
    {
        $this->manager = $this->container->get('doctrine')->getManager();
        $productInformations = $this->container->get('rad.magento.api')->connect();
        $productsToSynchonize = $this->manager->getRepository('RadProductBundle:Product')->findToSynchronize();
        /** @var Product $product */
        foreach ($productsToSynchonize as $product) {
            $this->synchronizeProduct($product);
            $ret[] = $sku = $this->getSku($product);
        }

        $this->manager->flush();

        if (!empty($this->data)) {
            if (!file_exists('../www/magmi/integration/productimport_datapump.php')) {
                require_once('../../www/magmi/integration/productimport_datapump.php');
                require_once('../../www/magmi/integration/magmi_datapump.php');
            }
            else {
                require_once('../www/magmi/integration/productimport_datapump.php');
                require_once('../www/magmi/integration/magmi_datapump.php');
            }
            $dp=\Magmi_DataPumpFactory::getDataPumpInstance('productimport');
            $dp->beginImportSession('default','create');
            foreach ($this->data as $import) {
                $dp->ingest($import);
            }
            $dp->endImportSession();

            foreach ($productsToSynchonize as $product) {
                $product->setSynchronizedAt(new \DateTime());
                $product->setReadySynchronization(false);
            }
            $this->manager->flush();
        }

        //array_map('unlink', $this->images);

        return $ret;
    }

    public function saveCsv()
    {
        if (empty($this->data)) {
            return ;
        }

        $file = uniqid('/tmp/') . '.csv';
        $fh = fopen($file, 'w');
        fputcsv($fh, array_keys($this->data[0]));
        array_map(function($data) use ($fh) {
            fputcsv($fh, $data);
        }, $this->data);

        fclose($fh);
        if (self::DEBUG) {
            echo '============================================================', PHP_EOL;
            echo file_get_contents($file);
            echo '============================================================', PHP_EOL;
        }

        return $file;
    }

    public function synchronizeProduct(Product $product)
    {
        $sku            = $this->getSku($product);
        $productData    = $this->getDataForProduct($product);
        $sizeAttributeId= $this->container->getParameter('magento_size_attribute_id');

        $declinaisons   = $this->manager->getRepository('RadMagentoConfigBundle:Declinaison')->findBy(array(
            'color'         => $product->getColor(),
            'support'       => $product->getSupport()
        ));

        $simpleSkus = array();

        foreach ($declinaisons as $declinaison) {
            $size           = $declinaison->getSize()->getShortName();
            $newSku         = $sku . '_' . $size;
            $simpleSkus[]   = $newSku;

            $productData['size'] = $size;
            $productData['sku']  = $newSku;
            $this->saveToMagento($product, 'simple', $productData);
        }

        $productData['visibility'] = $this->getMangentoVisibility();
        $productData['sku'] = $sku;
	    $productData['size'] = '';
        $productData['simple_skus'] = implode(',', $simpleSkus);
        $this->saveToMagento($product, 'configurable', $productData);
        $this->saveFields($product);
    }

    public function saveFields(Product $product)
    {
        if (count($product->getTranslations())) {
            $data = array();
            /** @var ProductFieldTranslated $item */
            foreach ($product->getTranslations() as $item) {
                if (!isset($data[$item->getCountry()->getLocale()])) {
                    $data[$item->getCountry()->getLocale()] = array();
                }
                $data[$item->getCountry()->getLocale()][implode('_', array_map('strtolower', preg_split('/(?=[A-Z])/',$item->getField())))] = $item->getValue();
            }

            foreach ($data as $locale => $item) {
                $tmp = array(
                    'store'     => $locale,
                    'websites'  => strtolower(substr($locale, -2, 2)),
                    'sku'  	=> $this->getSku($product),
                );
                foreach ($item as $k => $v) {
                    $tmp[$k] = $v;
                }
                $this->data[] = $tmp;
            }
        }
    }

    public function saveToMagento(Product $product, $type, $productData) {
        $productData['type'] = $type;
        if ($type == 'configurable') {
            $productData['category_ids'] = implode(',', $this->getCategories($product));
        }

        if (self::DEBUG) {
            foreach ($productData as $key => $value) {
                printf('%-30s %s' . PHP_EOL, $key, $value);
            }
            echo str_repeat('~', 60), PHP_EOL;
        }
        $this->data[] = $productData;

        if ($type == 'configurable') {
            $types = array('thumbnail', 'small_image', 'image', 'flat_image');
            $dataMagmi = array();
            foreach ($types as $position => $type) {
                $getter = 'get' . implode('', array_map('ucfirst', explode('_', $type))) . 'Path';
                $image = $this->container->getParameter('kernel.root_dir') . '/../web/uploads/' . $product->$getter();
                if (is_file($image)) {
                    $img = file_get_contents($image);
                    $name = sha1($img) . '.jpg';
                    $this->images[$name] = '/home/raaad/web/www/var/import/import-image-05-11-2015/'. $name;
                    file_put_contents('/home/raaad/web/www/var/import/import-image-05-11-2015/'. $name, $img);
                    $dataMagmi[$type] = '+' . $name;
                }
            }
            if (!empty($dataMagmi)) {
                $dataMagmi['is_synchronized'] = 2;
                $dataMagmi['store'] = 'admin';
                $dataMagmi['websites'] = 'admin';
                $this->data[] = $dataMagmi;
            }
        }
    }

    public function _saveToMagento(Product $product, $type, $attributeSet, $sku, $productData)
    {
        echo 'Adding ', $sku;
        $productId = $this->container->get('rad.magento.api')->call(
            'product.create',
            array(
                $type,
                $attributeSet,
                $sku,
                $productData
            )
        );

        echo "\rAdded #$productId  $sku", PHP_EOL;
        $this->createMagentoProduct($productId, $type, $product, $sku);
        if ($type == 'configurable') {
            echo 'Uploading images ... ';
            $types = array('thumbnail', 'small_image', 'image', 'flat_image');
            foreach ($types as $position => $type) {
                $uploaded = $this->uploadImage($productId, $product, $type, $position);
                echo $type, $uploaded ? ' OK ' : ' KO ';
            }
            echo PHP_EOL;
        }

        return $productId;
    }

    public function uploadImage($productId, Product $product, $type, $position)
    {
        $getter = 'get' . implode('', array_map('ucfirst', explode('_', $type))) . 'Path';
        $image = $this->container->getParameter('kernel.root_dir') . '/../web/uploads/' . $product->$getter();
        if (!is_file($image)) {
            return false;
        }

        $file = array(
            'content' => base64_encode(file_get_contents($image)),
            'mime' => mime_content_type($image)
        );

        try {
            $this->container->get('rad.magento.api')->call(
                'product_media.create',
                array(
		    $productId,
                    // $this->getSku($product),
                    array(
                        'file' => $file,
                        'label' => '',
                        'position' => $position,
                        'types' => array($type),
                        'exclude' => 0
                    )
                )
            );
            return true;
        } catch (\Exception $e) {
            /** @var \SoapClient $client */
            $client = $this->container->get('rad.magento.api')->soapClient;
            echo $client->__getLastResponse();
die;
            var_dump(
                array(
                    $productId,
                    array(
                        'file' => $file,
                        'label' => '',
                        'position' => $position,
                        'types' => array($type),
                        'exclude' => 0
                    )
                ));
            return false;
        }
    }

    public function createMagentoProduct($magentoId, $type, Product $product, $sku)
    {
        $mageProduct = new MagentoProduct();
        $mageProduct->setType($type);
        $mageProduct->setProduct($product);
        $mageProduct->setMagentoId($magentoId);
        $mageProduct->setName($sku);

        $this->manager->persist($mageProduct);

        return $mageProduct;
    }

    public function getDataForProduct(Product $product)
    {
        $stores = array(
            1 => array('code' => 'fr_fr', 'lang' => 'fr'),
            2 => array('code' => 'en_us', 'lang' => 'us'),
            4 => array('code' => 'en_gb', 'lang' => 'uk'),
            5 => array('code' => 'de_de', 'lang' => 'de')
        );

        $store   = array();
        $website = array();
        foreach ($this->getProductWebsites($product) as $storeId) {
            $store[] = $stores[$storeId]['code'];
            $website[] = $stores[$storeId]['lang'];
        }

        return array(
            'store'                     => implode(',', $store),
            'websites'                  => implode(',', $website),
            'sku'                       =>'',
            'size'                      =>'',
            'type'                      => 'simple',
            'attribute_set'             => $product->getAttributeSet()->getName(),
            'print_method'              => $product->getPrintingMethod()->getName(),
            'is_pretreated'             => $product->getIsPretreated() ? 1 : '',
            'design_cost_category'      => $product->getDesignCostCategory() ?: '',
            'design_color_id'           => $product->getDesignColor() ? $product->getDesignColor()->getMagentoId() : '',
            'category_artshop'          => $product->getSupport()->getCategoryArtshop()->getName(),
            'simple_skus'               => '',
            'tax_class_id'              => $this->getMagentoTaxClassId(),
            'configurable_attributes'   => 'size',
            'name'                      => $product->getName(),
            'manufacturer'              => $product->getManufacturer()->getName(),
            'cost'                      => $product->getBoughtPrice(),
            'price'                     => $product->getSellPrice(),
            'special_price'             => $product->getSpecialPrice(),
            'somme_artist'              => $product->getArtistAmount(),
            'is_synchronized'           => 2,
            'status'                    => $product->getOnline() ? 1 : 2,
            'visibility'                => 1,
            'description'               => $product->getSupport()->getDescription(),
            'spec'                      => $product->getSpec(),
            'size_info'                 => '',
            'category_ids'              => '',
            'main_category'             => '',
            'artist'                    => '',
            'main_tag'                  => '',
            'availability_from'         => '2013-11-01',
            'set_online_date'           => date('Y-m-d'),
            'is_in_stock'               => 1,
            'manage_stock'              => 0,
            'use_config_manage_stock'   => 0,
        );
    }

    public function getCategories(Product $product)
    {
        $ret = array();

        /** @var Category $category */
        foreach ($product->getCategories() as $category) {
            $ret[] = $category->getMagentoId();
        }

        return $ret;
    }

    public function getProductWebsites(Product $product)
    {
        $ret = array();

        /** @var Country $country */
        foreach ($product->getCountries() as $country) {
            $ret[] = $country->getMagentoStoreId();
        }

        return $ret;
    }

    public function getSku(Product $product)
    {
        return implode('_', array(
            $product->getSkuBegin(),
            $product->getSupport()->getName()
        ));
    }

    public function getMagentoTaxClassId()
    {
        return $this->container->getParameter('magento_tax_class');
    }

    public function getMangentoVisibility()
    {
        return $this->container->getParameter('magento_visibility');
    }
}
