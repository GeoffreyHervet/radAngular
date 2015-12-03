<?php

namespace Rad\PageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

abstract class BaseController extends Controller
{
    /**
     * Lists all User entities.
     *
     * @param $request
     *
     */
    public function indexAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $dql = 'SELECT e FROM ' . $this->getEntityName() . ' e';
        $query = $em->createQuery($dql);

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

    protected function _delete($entity)
    {
        /** @var \Doctrine\ORM\EntityManager $manager */
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($entity);
        $manager->flush();
        return $this->redirectToRoute($this->getBaseRoute() . '_index');
    }

    protected function renderForm($item, $action)
    {
        $form = $this->createForm($this->getFormName()); //, null, array('item' => $item));


        if ($this->getFormHandler()->process($form, $item))
        {
            $queue = $this->getRequest()->getSession()->get('redirection_queue', array());
            if (!empty($queue)) {
                $item = array_shift($queue);
                $this->getRequest()->getSession()->set('redirection_queue', $queue);
                $this->get('braincrafted_bootstrap.flash')->error($item['msg']);
                $this->getRequest()->getSession()->get('redirection_queue', array());;
                return $this->redirect($item['url']);
            }
            return $this->redirectToRoute($this->getBaseRoute() . '_index');
        }

        $data = array(
            'form'  => $form->createView(),
            'item'  => $item,
            'base_route'    => $this->getBaseRoute(),
            'base_template' => $this->getBaseTemplate(),
        );
        if (isset($this->viewData) && !empty($this->viewData)) {
            $data = array_merge($data, $this->viewData);
        }

        return $this->render(
            $this->getBaseTemplate() . ':' . $action . '.html.twig',
            $data
        );
    }

    protected function getFormHandler()
    {
        return $this->get('form.handler');
    }

    abstract public function getBaseTemplate();
    abstract public function getEntityClass();
    abstract public function getEntityName();
    abstract public function getFormName();
    abstract public function getBaseRoute();
}