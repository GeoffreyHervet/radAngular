<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Support;
use Rad\PageBundle\Controller\AutocompleteTraitController;
use Rad\PageBundle\Controller\BaseController;

class SupportAdminController extends BaseController
{
    use AutocompleteTraitController;

    public function createAction()
    {
        /** @var   $a */
        $a = $this->get('security.token_storage');
        return $this->renderForm(new Support(), 'create');
    }

    public function editAction(Support $support)
    {
        return $this->renderForm($support, 'edit');
    }

    public function deleteAction(Support $support)
    {
        return $this->_delete($support);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Support';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Support';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Support';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_support';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_support';
    }
}