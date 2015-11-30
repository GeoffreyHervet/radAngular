<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Color;
use Rad\PageBundle\Controller\AutocompleteTraitController;
use Rad\PageBundle\Controller\BaseController;



class ColorAdminController extends BaseController
{
    use AutocompleteTraitController;

    public function createAction()
    {
        return $this->renderForm(new Color(), 'create');
    }

    public function editAction(Color $color)
    {
        return $this->renderForm($color, 'edit');
    }

    public function deleteAction(Color $color)
    {
        return $this->_delete($color);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Color';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Color';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Color';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_color';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_color';
    }
}