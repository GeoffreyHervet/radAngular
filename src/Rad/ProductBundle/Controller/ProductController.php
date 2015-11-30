<?php

namespace Rad\ProductBundle\Controller;

use Rad\ProductBundle\Entity\Product;
use Rad\PageBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends BaseController
{
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