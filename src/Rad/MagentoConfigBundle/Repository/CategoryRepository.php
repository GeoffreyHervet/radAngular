<?php

namespace Rad\MagentoConfigBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Rad\MagentoConfigBundle\Entity\Category;
use Rad\PageBundle\Repository\SearchTraitRepository;

class CategoryRepository extends EntityRepository
{
    public function search($q, $limit, $field = 'e.name')
    {
        $categories = $this->findAll();
        $result = array();

        uasort($categories, function(Category $a, Category $b){ return strcmp($a, $b); });
        $q = explode(' ', trim(strtolower($q)));
        /** @var Category $category */
        foreach ($categories as $category) {
            if ($this->match($category, $q)) {
                $result[] = array('id' => $category->getId(), 'text' => $category->__toString());
                if (--$limit <= 0) {
                    break;
                }
            }
        }

        return $result;
    }

    /**
     * @param Category $category
     * @param array $keyWords
     * @return bool
     */
    private function match($category, array $keyWords)
    {
        $category = strtolower($category);
        foreach ($keyWords as $word) {
            if (strpos($category, $word) === false) {
                return false;
            }
        }

        return true;
    }
}