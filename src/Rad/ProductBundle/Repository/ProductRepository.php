<?php

namespace Rad\ProductBundle\Repository;


use Doctrine\ORM\EntityRepository;
use Rad\MagentoConfigBundle\Entity\Category;
use Rad\PageBundle\Repository\SearchTraitRepository;

class ProductRepository extends EntityRepository
{
    public function findToSynchronize()
    {
        return $this->findBy(array(
            'readySynchronization'  => true,
//            'synchronizedAt'        => null
        ));
    }

    public function search($q, $name = 'e')
    {
        return
            $this
                ->createQueryBuilder($name)
                ->orWhere($name.'.skuBegin LIKE :search')
                ->orWhere($name.'.name LIKE :search')
                ->setParameter(':search', '%'. $q .'%')
                ->getQuery();
    }
}
