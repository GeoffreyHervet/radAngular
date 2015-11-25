<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\PageBundle\Controller\BaseController;

class PrintingMethodAdminController extends BaseController
{

    public function createAction()
    {
        return $this->renderForm(new PrintingMethod(), 'create');
    }

    public function editAction(PrintingMethod $printing_method)
    {
        return $this->renderForm($printing_method, 'edit');
    }

    public function deleteAction(PrintingMethod $printing_method)
    {
        return $this->_delete($printing_method);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:PrintingMethod';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\PrintingMethod';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:PrintingMethod';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_printing_method';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_printing_method';
    }
}