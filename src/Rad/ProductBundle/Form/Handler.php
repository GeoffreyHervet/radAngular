<?php

namespace Rad\ProductBundle\Form;

use Rad\MagentoConfigBundle\Entity\Country;
use Rad\ProductBundle\Entity\Product;
use Rad\ProductBundle\Entity\ProductFieldTranslated;
use Symfony\Component\Form\Form;
use Rad\PageBundle\Processor\FormHandler;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class Handler extends FormHandler
{
    protected $urlQueue = array();

    public function process(Form $form, $data)
    {
        $form->setData($data);

        if ('POST' === $this->request->getMethod() && sizeof($this->request->request) > 0)
        {
            $form->handleRequest($this->request);
            if ($form->isValid())
            {
                $this->em->persist($data);
                $this->em->flush();
                $this->buildTranslations($form->getData());
                $this->validateForRedirection($data);
                $this->em->flush();
                return true;
            }

        }

        return false;
    }

    public function buildTranslations(Product $product)
    {
	if ($product->getCountries()->count() <= 1) {
	    return ;
	}
        $fields         = $product->getTranslations(); //$this->em->getRepository(ProductFieldTranslated::class)->findByProduct($product);
        $emptyFields    = $this->buildEmptyFieldList($product);

        /** @var ProductFieldTranslated $field */
        foreach ($fields as $oldFieldKey => $field)
        {
            if (!$product->getCountries()->contains($field->getCountry()))
            {
                $this->em->remove($field);
                $product->removeTranslation($field);
                continue;
            }
            /** @var ProductFieldTranslated $emptyField */
            foreach ($emptyFields as $key => $emptyField)
            {
                if ($field->eq($emptyField)) {
                    unset($emptyFields[$key]);
                }
            }
        }

        $em = $this->em;
        array_map(function($f) use ($product, $em) {
            /** @var ProductFieldTranslated $f */
            $f->setProduct($product);
            $em->persist($f);
        }, $emptyFields);

        if (!empty($emptyFields)) {
            $this->urlQueue[] = array(
                'msg' => 'Please fill the following fields.',
                'url' => $this->container->get('router')->generate('rad_product_fields', array('product' => $product->getId()))
            );
        }
        $em->flush();
    }

    protected function buildEmptyFieldList(Product $product)
    {
        $fieldsToTranslate = Product::fieldToTranslate();
        $ret = array();
        /** @var Country $country */
        foreach ($product->getCountries() as $country)
        {
            foreach ($fieldsToTranslate as $key)
            {
                $ret[] = new ProductFieldTranslated($product, $country, $key);
            }
        }

        return $ret;
    }

    public function validateForRedirection(Product $product)
    {
        $result = true;

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
            $this->urlQueue[] = array(
                'msg' => 'Please fill the following fields : ' . implode(', ', $needs) . '.',
                'url' => $this->container->get('router')->generate('rad_magento_admin_support_edit', array('id' => $support->getId()), UrlGeneratorInterface::ABSOLUTE_URL)
            );
            $this->urlQueue[] = array(
                'msg' => null,
                'url' => $this->container->get('router')->generate('rad_product_index', UrlGeneratorInterface::ABSOLUTE_URL)
            );
        }

        $this->request->getSession()->set('redirection_queue', $this->urlQueue);
        return $result;
    }
}
