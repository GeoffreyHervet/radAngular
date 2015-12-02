<?php

namespace Rad\ProductBundle\Controller;

use Rad\ProductBundle\Entity\Product;
use Rad\PageBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends BaseController
{
    /*
     *
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
     */

    public function getFormHandler()
    {
        return $this->get('rad.product.form.handler');
    }

    public function synchronizeAction()
    {
        $this->get('rad.product.synchronization')->process();
        return $this->redirectToRoute($this->getBaseRoute() . '_index');
    }

    public function createAction()
    {
        return $this->renderForm(new Product(), 'create');
    }

    public function editAction(Product $product)
    {
        return $this->renderForm($product, 'edit');
    }

    public function deleteAction(Product $product)
    {
        return $this->_delete($product);
    }

    public function getBaseTemplate()
    {
        return 'RadProductBundle:Product';
    }

    public function getEntityClass()
    {
        return '\Rad\ProductBundle\Entity\Product';
    }

    public function getEntityName()
    {
        return 'RadProductBundle:Product';
    }

    public function getFormName()
    {
        return 'rad_productbundle_product';
    }

    public function getBaseRoute()
    {
        return 'rad_product';
    }
}