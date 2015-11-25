<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Country;
use Rad\PageBundle\Controller\BaseController;

class CountryAdminController extends BaseController
{

    public function createAction()
    {
        return $this->renderForm(new Country(), 'create');
    }

    public function editAction(Country $country)
    {
        return $this->renderForm($country, 'edit');
    }

    public function deleteAction(Country $country)
    {
        return $this->_delete($country);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Country';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Country';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Country';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_country';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_country';
    }
}