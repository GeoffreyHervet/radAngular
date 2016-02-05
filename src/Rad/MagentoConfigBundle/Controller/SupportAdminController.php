<?php

namespace Rad\MagentoConfigBundle\Controller;

use Doctrine\Common\Collections\ArrayCollection;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\MagentoConfigBundle\Entity\SupportSpec;
use Rad\PageBundle\Controller\AutocompleteTraitController;
use Rad\PageBundle\Controller\BaseController;
use Rad\ProductBundle\Entity\Product;

class SupportAdminController extends BaseController
{
    use AutocompleteTraitController;

    public function createAction()
    {
        /** @var   $a */
        $a = $this->get('security.token_storage');
        return $this->renderForm(new Support(), 'create');
    }

    /**
     * @param $support Support
     * @param $action string
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    protected function renderForm($support, $action)
    {
        $countries = new ArrayCollection($this->getDoctrine()->getRepository('RadMagentoConfigBundle:Country')->findAll());
        /** @var SupportSpec $spec */
        foreach ($support->getSpecs() as $spec)
        {
            $countries->removeElement($spec->getCountry());
        }
        foreach ($countries as $country) {
            $support->addSpec(new SupportSpec($support, $country));
        }

        return parent::renderForm($support, $action);
    }


    public function synchronizeAction(Support $support)
    {
        /** @var Product $product */
        foreach ($support->getProducts() as $product)
        {
            $product->setReadySynchronization(true);
        }
        $this->getDoctrine()->getManager()->flush();

        $ret = $this->get('rad.product.synchronization')->process();
        if (!$ret || empty($ret)) {
            $this->get('braincrafted_bootstrap.flash')->error('No product to synchronize');
        }
        else {
            $this->get('braincrafted_bootstrap.flash')->success('Products synchronized: ' . implode('<br />', $ret));
        }
        return $this->redirectToRoute($this->getBaseRoute() . '_index');
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