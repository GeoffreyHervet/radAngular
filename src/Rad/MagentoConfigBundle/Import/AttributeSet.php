<?php

namespace Rad\MagentoConfigBundle\Import;

use Rad\MagentoConfigBundle\Processor\ApiProcessor;
use Doctrine\Bundle\DoctrineBundle\Registry;

class AttributeSet
{
    /**
     * @var ApiProcessor
     */
    protected $api;
    /**
     * @var Registry
     */
    protected $doctrine;

    public function __construct(ApiProcessor $api, Registry $doctrine)
    {
        $this->api = $api;
        $this->doctrine = $doctrine;
    }


    protected function getData()
    {
        return $this->api->call('product_attribute_set.list');
    }

    public function run()
    {
        foreach ($this->getData() as $item) {
            $attribute = $this->getAttribute($item['set_id'], $item['name']);
            echo $attribute, PHP_EOL;
        }
        $this->doctrine->getManager()->flush();
    }

    /**
     * @param $name
     * @return \Rad\MagentoConfigBundle\Entity\AttributeSet
     */
    public function getAttribute($magentoId, $name)
    {
        $manager = $this->doctrine->getManager();

        $attribute = $manager->getRepository('\Rad\MagentoConfigBundle\Entity\AttributeSet')->findOneByMagentoId($magentoId);

        if (!$attribute) {
            $attribute = new \Rad\MagentoConfigBundle\Entity\AttributeSet();
            $attribute->setName($name);
            $attribute->setMagentoId($magentoId);

            $manager->persist($attribute);
        }


        return $attribute;
    }
}
