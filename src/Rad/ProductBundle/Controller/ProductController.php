<?php

namespace Rad\ProductBundle\Controller;

use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\ProductBundle\Entity\Product;
use Rad\PageBundle\Controller\BaseController;
use Rad\ProductBundle\Entity\ProductFieldTranslated;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends BaseController
{
    protected $viewData = array();

    public function indexAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');

        $dql = 'SELECT e FROM ' . $this->getEntityName() . ' e';
        $query = $em->createQuery($dql);
        $search = $request->get('q');
        if ($search) {
            $query = $this->getDoctrine()->getRepository($this->getEntityClass())->search($search, 'e');
        }

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate(
            $query,
            $request->query->getInt('page', 1),
            intval($this->getParameter('item_per_page'))
        );

        return $this->render($this->getBaseTemplate() . ':index.html.twig', array(
            'pagination'    => $pagination,
            'base_route'    => $this->getBaseRoute(),
            'base_template' => $this->getBaseTemplate()
        ));
    }

    public function showAction(Product $product)
    {
        return $this->render(
            $this->getBaseTemplate() . ':show.html.twig',
            array('product' => $product, 'base_route' => $this->getBaseRoute())
        );
    }

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

    public function fieldsAction(Request $request, Product $product)
    {
        if ($request->isMethod('POST')) {
            $ret = array('errors' => array());
            foreach ($request->request as $id => $value) {
                if (!$this->updateField($id, $value)) {
                    $ret['errors'][] = $id;
                }
            }
            $this->getDoctrine()->getManager()->flush();

            if (empty($ret['errors'])) {
                $ret['url'] = $this->container->get('router')->generate('rad_product_index');

                $queue = $request->getSession()->get('redirection_queue', array());
                if (!empty($queue)) {
                    $item = array_shift($queue);
                    $request->getSession()->set('redirection_queue', $queue);
                    if ($item['msg']) {
                        $this->get('braincrafted_bootstrap.flash')->error($item['msg']);
                    }
                    $ret['url'] = $item['url'];
                }
            }
            return new JsonResponse($ret);
        }
        return $this->render($this->getBaseTemplate() . ':fields.html.twig', array('product' => $product));
    }

    public function updateField($id, $value)
    {
        /** @var ProductFieldTranslated $item */
        $item = $this->getDoctrine()->getManager()->find('Rad\ProductBundle\Entity\ProductFieldTranslated', $id);
        $item->setValue($value);

        return count($this->get('validator')->validate($item)) ? false : true;
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
