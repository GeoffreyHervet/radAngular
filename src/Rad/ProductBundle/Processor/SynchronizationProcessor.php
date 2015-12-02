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

        $this->saveToMagento($product, 'configurable', $product->getAttributeSet()->getMagentoId(), $sku, $productData);

        $declinaisons   = $this->manager->getRepository('RadMagentoConfigBundle:Declinaison')->findBy(array(
            'color'         => $product->getColor(),
            'support'       => $product->getSupport()
        ));

        /** @var Declinaison $declinaison */
        foreach ($declinaisons as $declinaison) {
            $mageId = $declinaison->getSize()->getMagentoId();
            if (!$mageId) {
                echo 'Ignore '. $declinaison->getSize(), PHP_EOL;
                continue;
            }

            $productData['size'] = $mageId;
            $newSku = $sku . '_'. $declinaison->getSize()->getShortName();
            $this->saveToMagento($product, 'simple', $product->getAttributeSet()->getMagentoId(), $newSku, $productData);
        }
        // http://www.magentocommerce.com/api/soap/catalog/catalogProductAttributeMedia/productImages.html
    }

    public function saveToMagento($product, $type, $attributeSet, $sku, $productData)
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
        $this->createMagentoProduct($productId, $type, $product);
    }

    public function createMagentoProduct($magentoId, $type, Product $product)
    {
        $mageProduct = new MagentoProduct();
        $mageProduct->setType($type);
        $mageProduct->setProduct($product);
        $mageProduct->setMagentoId($magentoId);

        $this->manager->persist($mageProduct);

        return $mageProduct;
    }

    public function getDataForProduct(Product $product)
    {
        $categories = $this->getCategories($product);
        return array(
            'name'                  => $product->getName(),
            'websites'              => $this->getProductWebsites($product),
//            'status'                => 1,
            'status'                => 0,
            'weight'                => 0,
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
            'design_color'          => $product->getDesignColor()->__toString()
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

/*
 *
$proxy->call($sessionId, 'product.create', array('simple', $set['set_id'], 'sku_of_product', $newProductData));
$proxy->call($sessionId, 'product_stock.update', array('sku_of_product', array('qty'=>50, 'is_in_stock'=>1)));

// Get info of created product
var_dump($proxy->call($sessionId, 'product.info', 'sku_of_product'));

// Update product name on german store view
$proxy->call($sessionId, 'product.update', array('sku_of_product', array('name'=>'new name of product'), 'german'));

// Get info for default values
var_dump($proxy->call($sessionId, 'product.info', 'sku_of_product'));
// Get info for german store view

var_dump($proxy->call($sessionId, 'product.info', array('sku_of_product', 'german')));

// Delete product
$proxy->call($sessionId, 'product.delete', 'sku_of_product');

try {
    // Ensure that product deleted
    var_dump($proxy->call($sessionId, 'product.info', 'sku_of_product'));
} catch (SoapFault $e) {
    echo "Product already deleted";
}
 */