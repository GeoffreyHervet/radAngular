<?php

namespace Rad\ProductBundle\Controller;

use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\ProductBundle\Entity\Product;
use Rad\PageBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends BaseController
{
    protected $viewData = array();

    protected function setViewData()
    {
        $prints = $this->getDoctrine()->getManager()->getRepository('RadMagentoConfigBundle:PrintingMethod')->findAll();

        /** @var PrintingMethod $print */
        foreach ($prints as $print) {
            if (in_array(strtolower($print->getName()), $this->getParameter('magento_pretreated_labels'))) {
                if (!isset($this->viewData['pretreated'])) {
                    $this->viewData['pretreated'] = array();
                }
                $this->viewData['pretreated'][] = $print;
            }
            if (in_array(strtolower($print->getName()), $this->getParameter('magento_design_cost_category_labels'))) {
                if (!isset($this->viewData['design_cost_category'])) {
                    $this->viewData['design_cost_category'] = array();
                }
                $this->viewData['design_cost_category'][] = $print;
            }
            if (in_array(strtolower($print->getName()), $this->getParameter('magento_design_color_labels'))) {
                if (!isset($this->viewData['design_color'])) {
                    $this->viewData['design_color'] = array();
                }
                $this->viewData['design_color'][] = $print;
            }
        }
    }

    public function getFormHandler()
    {
        return $this->get('rad.product.form.handler');
    }

    public function synchronizeAction()
    {
        $ret = $this->get('rad.product.synchronization')->process();
        if (!$ret || empty($ret)) {
            $this->get('braincrafted_bootstrap.flash')->error('No product to synchronize');
        }
        else {
            $this->get('braincrafted_bootstrap.flash')->success('Products synchronized: ' . implode(',', $ret));
        }
        return $this->redirectToRoute($this->getBaseRoute() . '_index');
    }

    public function createAction()
    {
        $this->setViewData();
        return $this->renderForm(new Product(), 'create');
    }

    public function editAction(Product $product)
    {
        $this->setViewData();
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
