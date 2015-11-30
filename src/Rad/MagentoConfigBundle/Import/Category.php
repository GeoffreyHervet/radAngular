<?php

namespace Rad\MagentoConfigBundle\Import;

use Rad\MagentoConfigBundle\Processor\ApiProcessor;
use Doctrine\Bundle\DoctrineBundle\Registry;

class Category
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
        return $this->api->call('catalog_category.tree');
    }

    public function run()
    {
        $this->process($this->getData());
        $this->doctrine->getManager()->flush();
    }

    public function process($item, $parent = null)
    {
        $category = $this->getCategory($item['category_id'], $item['name'], $parent);
        echo $category, PHP_EOL;
        if (isset($item['children']) && !empty($item['children'])) {
            foreach ($item['children'] as $child) {
                $this->process($child, $category);
            }
        }
    }

    /**
     * @param $name
     * @return \Rad\MagentoConfigBundle\Entity\Category
     */
    public function getCategory($magentoId, $name, $parent)
    {
        static $cache = array();
        static $nb;
        if (isset($cache[$magentoId])) {
            return $cache[$magentoId];
        }
        $manager = $this->doctrine->getManager();

        $category = $manager->getRepository('\Rad\MagentoConfigBundle\Entity\Category')->findOneByMagentoId($magentoId);

        if (!$category) {
            $category = new \Rad\MagentoConfigBundle\Entity\Category();
            $category->setName($name);
            $category->setMagentoId($magentoId);
            $category->setParent($parent);

            $manager->persist($category);
        }

        $cache[$magentoId] = $category;

        if (!(++$nb % 10)) {
            $manager->flush();
        }

        return $category;
    }
}
