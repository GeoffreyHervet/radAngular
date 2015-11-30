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
            'synchronizedAt'        => null
        ));
    }
}
