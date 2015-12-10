<?php

namespace Rad\ProductBundle\Processor;

use Rad\MagentoConfigBundle\Entity\Category;
use Rad\MagentoConfigBundle\Entity\Country;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\ProductBundle\Entity\MagentoProduct;
use Rad\ProductBundle\Entity\Product;
use Symfony\Component\DependencyInjection\ContainerAware;

class SynchronizationProcessor extends ContainerAware
{
    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    protected $manager;

    public function process()
    {
        echo 'Connect ... ';
        $this->container->get('rad.magento.api')->connect();
        echo 'OK', PHP_EOL;

        $this->manager = $this->container->get('doctrine')->getManager();
        $productsToSynchonize = $this->manager->getRepository('RadProductBundle:Product')->findToSynchronize();
        /** @var Product $product */
        foreach ($productsToSynchonize as $product) {
            $this->synchronizeProduct($product);
            echo $product, PHP_EOL;
        }

        $this->manager->flush();
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

        $productData['visibility'] = 1;

        /** @var Declinaison $declinaison */
        $values = array();
        $dataConfig = array();
        $newSkus = array();
        foreach ($declinaisons as $declinaison) {
            $mageId = $declinaison->getSize()->getMagentoId();
            if (!$mageId) {
                echo 'Ignore ' . $declinaison->getSize(), PHP_EOL;
                continue;
            }

            $productData['size'] = $mageId;
            $newSku = $sku . '_' . $declinaison->getSize()->getShortName();
            $newSkus[] = $newSku;
            $newProductId = $this->saveToMagento($product, 'simple', $product->getAttributeSet()->getMagentoId(), $newSku, $productData);
            $dataConfig[$newProductId] = array(
                'attribute_id'  => $sizeAttributeId,
                'label'         => $declinaison->getSize()->__toString(),
                'value_index'   => $declinaison->getSize()->getMagentoId(),
                'is_percent'    => 0,
                'pricing_value' => ''
            );
            $values[] = $dataConfig[$newProductId];
        }

        $productData['visibility'] = $this->getMangentoVisibility();
//        $configurableAttributesData = array(
//            array(
//                'id'                => null,
//                'label'             => '', //optional, will be replaced by the modified api.php
//                'position'          => NULL,
//                'values'            => $values,
//                'attribute_id'      => $sizeAttributeId,
//                'attribute_code'    => 'size',
//                'frontend_label'    => 'Taille',
//                'html_id'           => 'configurable__attribute_0'
//            )
//        );
//
//        $productData['configurable_products_data'] = $values;
//        $productData['configurable_attributes_data'] = $configurableAttributesData;
//        $productData['can_save_configurable_attributes'] = 1;
//        $productData['affect_configurable_product_attributes'] = 1;

//        var_dump($productData);
        $this->saveToMagento($product, 'configurable', $product->getAttributeSet()->getMagentoId(), $sku, $productData);
        $this->container->get('rad.magento.api')->call('product_media.create', array(
                $sku,
                $newSkus,
                array('size'),
                
            )
        );
        $proxy->call($sessionId, 'catalog_product_type_configurable.assign', array(
            $configurableProductIdOrSku,
            $simpleProductIdsOrSkus,
            array('color','size'),
            array('color'=>'Farbe','size'=>'Grösse'),
            array(
                'gelb' => array(
                    'pricing_value' =>'35',
                    'is_percent'    =>0
                ),
                'XL' =>  array(
                    'pricing_value' =>20.00,
                    'is_percent'    =>1
                )
            )
        ));

    }

    public function saveToMagento(Product $product, $type, $attributeSet, $sku, $productData)
    {
//        if ($type == 'configurable') {
//            $productData['attribute'] = 1147;
//        }
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
//            die;
//            var_dump($e);
//            die;
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
        $categories = $this->getCategories($product);
        return array(
            'name'                  => $product->getName(),
            'websites'              => $this->getProductWebsites($product),
            'status'                => 1,
//            'status'                => 0,
            'weight'                => 0,
            'is_synchronized'       => 2,
            'visibility'            => $this->getMangentoVisibility(),
            'tax_class_id'          => $this->getMagentoTaxClassId(),
            'categories'            => $categories,
            'custom_artwork'        => $product->getSupport()->getArtShop() ? 1 : 0,
            'price'                 => $product->getSellPrice(),
            'somme_artist'          => $product->getArtistAmount(),
            'special_price'         => $product->getSpecialPrice(),
            'cost'                  => $product->getBoughtPrice(),
            'availability_from'     => '01/11/13',
            'category_artshop'      => $product->getSupport()->getCategoryArtshop()->getMagentoId(),
            'is_pretreated'         => $product->getIsPretreated() ? 1 : 0,
            'size_info'             => $product->getSupport()->getSizeInfo()->getMagentoId(),
            'description'           => $product->getSupport()->getDescription(),
            'print_method'          => $product->getPrintingMethod()->__toString(),
            'design_cost_category'  => $product->getDesignCostCategory(),
            'design_color'          => $product->getDesignColor()->__toString(),
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