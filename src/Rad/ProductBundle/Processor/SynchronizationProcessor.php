<?php

namespace Rad\ProductBundle\Processor;

use Rad\MagentoConfigBundle\Entity\Category;
use Rad\MagentoConfigBundle\Entity\Country;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\ProductBundle\Entity\MagentoProduct;
use Rad\ProductBundle\Entity\Product;
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

    const DEBUG = false;

    public function process()
    {
//        echo 'Connect ... ';
//        $this->container->get('rad.magento.api')->connect();
//        echo 'OK', PHP_EOL;

        $this->manager = $this->container->get('doctrine')->getManager();
        $productsToSynchonize = $this->manager->getRepository('RadProductBundle:Product')->findToSynchronize();
        /** @var Product $product */
        foreach ($productsToSynchonize as $product) {
            $this->synchronizeProduct($product);
        }

        $this->manager->flush();

        $file = $this->saveCsv();
        if ($file) {
            if (php_sapi_name() == 'cli') {
                echo file_get_contents($file);
                return;
            }
            $response = new Response(
                file_get_contents($file),
                200,
                array(
                    'Content-Type' => 'application/force-download',
                    'Content-Disposition' => 'attachment; filename="export-products-'. date('Y-m-d_H-i') . '.csv"'
                )
            );

            $this->container->get('braincrafted_bootstrap.flash')->info('Products synchronized: '. implode(', ', $productsToSynchonize));
            return $response;
        }

        return null;
    }

    public function saveCsv()
    {
        if (empty($this->data)) {
            return ;
        }

        $file = uniqid('/tmp/') . '.csv';
        $fh = fopen($file, 'w');
        fputcsv($fh, array_keys($this->data[0]), '|', '"', '\\');
        array_map(function($data) use ($fh) {
            fputcsv($fh, $data, '|', '"', '\\');
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
        $sku            = 'TEST_'. time() . '_' . $this->getSku($product);
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
        $productData['simple_skus'] = implode(',', $simpleSkus);
        $this->saveToMagento($product, 'configurable', $productData);

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
                    $this->getSku($product),
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

//        var_dump($product->getDesignCostCategory());
        return array(
            'store'                     => implode(',', $store),
            'websites'                  => implode(',', $website),
            'type'                      => 'simple',
            'attribute_set'             => $product->getAttributeSet()->getName(),
            'print_method'              => $product->getPrintingMethod()->getName(),
            'is_pretreated'             => $product->getIsPretreated() ? 1 : '',
            'design_cost_category'      => $product->getDesignCostCategory(),
            'design_color_id'           => $product->getDesignColor()->getMagentoId(),
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
            'status'                    => 2,
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