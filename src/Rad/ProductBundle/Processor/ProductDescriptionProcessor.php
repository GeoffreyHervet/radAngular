<?php

namespace Rad\ProductBundle\Processor;

use Rad\MagentoConfigBundle\Entity\Country;
use Rad\ProductBundle\Entity\Product;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ProductDescriptionProcessor extends ContainerAware
{
    /**
     * @param $product Product
     */
    public function getDescription($product)
    {
        if ($product->getCountries()->count() > 1) {
            $ret = array();
            /** @var Country $country */
            foreach ($product->getCountries() as $country) {
                $ret[$country->getId()] = $this->getByCountry($product, $country);
            }

            return $ret;
        }

        return $this->getByCountry($product, $product->getCountries()->first());
    }

    /**
     * @param $product Product
     * @param $country Country
     * @return null|\Rad\MagentoConfigBundle\Entity\Description
     */
    public function getByCountry($product, $country)
    {
        return $this->container->get('doctrine')->getRepository('RadMagentoConfigBundle:Description')->findOneBy(array(
            'country'           => is_object($country) ? $country : $this->container->get('doctrine')->getManager()->find('RadMagentoConfigBundle:Country', $country),
            'printingMethod'    => $product->getPrintingMethod(),
            'support'           => $product->getSupport(),
        ));
    }


    /**
     * @param $product Product
     * @param $country
     * @return string
     */
    public function getUrl($product, $country)
    {
        return $this->container->get('router')->generate('rad_magento_admin_description_create', array(
            'support' => $product->getSupport()->getId(),
            'country' => is_object($country) ? $country->getId() : $country,
            'print' => $product->getPrintingMethod()->getId(),
        ), UrlGeneratorInterface::ABSOLUTE_URL);
    }
}
