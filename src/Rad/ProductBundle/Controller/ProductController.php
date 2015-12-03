<?php

namespace Rad\ProductBundle\Controller;

use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\ProductBundle\Entity\Product;
use Rad\PageBundle\Controller\BaseController;

class ProductController extends BaseController
{
    protected $viewData = array();
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
        $this->get('rad.product.synchronization')->process();
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