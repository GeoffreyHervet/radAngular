<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Description;
use Rad\PageBundle\Controller\BaseController;
use Symfony\Component\HttpFoundation\Request;

class DescriptionController extends BaseController
{
    public function createAction(Request $request)
    {
        $description = new Description();
        $support = $request->get('support');
        $country = $request->get('country');
        $printmeth = $request->get('print');

        if ($support) {
            $description->setSupport($this->getDoctrine()->getManager()->find('Rad\MagentoConfigBundle\Entity\Support', $support));
        }
        if ($country) {
            $description->setCountry($this->getDoctrine()->getManager()->find('Rad\MagentoConfigBundle\Entity\Country', $country));
        }
        if ($printmeth) {
            $description->setPrintingMethod($this->getDoctrine()->getManager()->find('Rad\MagentoConfigBundle\Entity\PrintingMethod', $printmeth));
        }

        return $this->renderForm($description, 'create');
    }

    public function editAction(Description $description)
    {
        return $this->renderForm($description, 'edit');
    }

    public function deleteAction(Description $description)
    {
        return $this->_delete($description);
    }

    public function getBaseTemplate()
    {
        return 'RadMagentoConfigBundle:Description';
    }

    public function getEntityClass()
    {
        return '\Rad\MagentoConfigBundle\Entity\Description';
    }

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Description';
    }

    public function getFormName()
    {
        return 'rad_magento_admin_description';
    }

    public function getBaseRoute()
    {
        return 'rad_magento_admin_description';
    }
}