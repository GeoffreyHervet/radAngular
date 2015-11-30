<?php

namespace Rad\MagentoConfigBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Rad\PageBundle\Repository\SearchTraitRepository;

class ColorRepository extends EntityRepository
{
    use SearchTraitRepository;
}