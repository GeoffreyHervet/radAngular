<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Size;
use Rad\PageBundle\Controller\BaseController;

class SizeAdminController extends BaseController
{

    public function createAction()
    {
        return $this->renderForm(new Size(), 'create');
    }

    public function editAction(Size $size)
    {
        return $this->renderForm($size, 'edit');
    }

    public function deleteAction(Size $size)
    {
        return $this->_delete($size);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Size';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Size';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Size';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_size';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_size';
    }
}