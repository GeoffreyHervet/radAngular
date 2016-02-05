<?php

namespace Rad\MagentoConfigBundle\Controller;

use Doctrine\Common\Collections\ArrayCollection;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\ColorName;
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

    /**
     * @param $color Color
     * @param $action string
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    protected function renderForm($color, $action)
    {
        $countries = new ArrayCollection($this->getDoctrine()->getRepository('RadMagentoConfigBundle:Country')->findAll());
        /** @var ColorName $label */
        foreach ($color->getLabels() as $label)
        {
            $countries->removeElement($label->getCountry());
        }
        foreach ($countries as $country) {
            $color->addLabel(new ColorName($color, $country));
        }


        return parent::renderForm($color, $action);
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