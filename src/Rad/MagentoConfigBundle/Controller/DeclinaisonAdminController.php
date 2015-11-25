<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\PageBundle\Controller\BaseController;

class DeclinaisonAdminController extends BaseController
{

    public function createAction()
    {
        return $this->renderForm(new Declinaison(), 'create');
    }

    public function editAction(Declinaison $declinaison)
    {
        return $this->renderForm($declinaison, 'edit');
    }

    public function deleteAction(Declinaison $declinaison)
    {
        return $this->_delete($declinaison);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Declinaison';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Declinaison';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Declinaison';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_declinaison';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_declinaison';
    }
}