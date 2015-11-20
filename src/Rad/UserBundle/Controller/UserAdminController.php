<?php

namespace Rad\UserBundle\Controller;

use Rad\PageBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;

use Rad\UserBundle\Entity\User;
use Rad\UserBundle\Form\UserType;

/**
 * User controller.
 *
 */
class UserAdminController extends BaseController
{

    /**
     * Lists all User entities.
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

    public function createAction()
    {
        return $this->renderForm(new User(), 'create');
    }

    public function editAction(User $user)
    {
        return $this->renderForm($user, 'edit');
    }

    public function deleteAction(User $user)
    {
        return $this->_delete($user);
    }

    public function getBaseTemplate()
    {
        return 'RadUserBundle:User';
    }

    public function getEntityClass()
    {
        return '\Rad\UserBundle\Entity\User';
    }

    public function getEntityName()
    {
        return 'RadUserBundle:User';
    }

    public function getFormName()
    {
        return 'rad_userbundle_usertype';
    }

    public function getBaseRoute()
    {
        return 'admin_user';
    }
}