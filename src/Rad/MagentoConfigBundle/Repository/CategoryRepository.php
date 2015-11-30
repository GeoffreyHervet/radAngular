<?php

namespace Rad\MagentoConfigBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Rad\PageBundle\Repository\SearchTraitRepository;

class CategoryRepository extends EntityRepository
{
    use SearchTraitRepository;
}