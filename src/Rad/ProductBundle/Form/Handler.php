<?php

namespace Rad\ProductBundle\Form;

use Rad\ProductBundle\Entity\Product;
use Symfony\Component\Form\Form;
use Rad\PageBundle\Processor\FormHandler;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class Handler extends FormHandler
{
    public function process(Form $form, $data)
    {
        $form->setData($data);

        if ('POST' === $this->request->getMethod() && sizeof($this->request->request) > 0)
        {
            $form->handleRequest($this->request);
            if ($form->isValid())
            {
                $this->buildTranslations($data);
                $this->validateForRedirection($data);
                $this->em->persist($data);
                $this->em->flush();

                return true;
            }

        }

        return false;
    }

    public function buildTranslations(Product $product)
    {

    }

    public function validateForRedirection(Product $product)
    {
        $result = true;
        $urlRedirect = array();

        $support = $product->getSupport();
        $needs = array();
        if (!$support->getCategoryArtshop()) {
            $needs[] = 'Category artshop';
        }
        if (!$support->getSizeInfo()) {
            $needs[] = 'Size information';
        }
        if (!$support->getDescription()) {
            $needs[] = 'Description';
        }

        if (!empty($needs)) {
            $result = false;
            $urlRedirect[] = array(
                'msg' => 'Please fill the following fields : ' . implode(', ', $needs) . '.',
                'url' => $this->container->get('router')->generate('rad_magento_admin_support_edit', array('id' => $support->getId()), UrlGeneratorInterface::ABSOLUTE_URL)
            );
            $urlRedirect[] = array(
                'msg' => null,
                'url' => $this->container->get('router')->generate('rad_product_index', UrlGeneratorInterface::ABSOLUTE_URL)
            );
        }

        $this->request->getSession()->set('redirection_queue', $urlRedirect);
        return $result;
    }
}