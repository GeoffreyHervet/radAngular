<?php

namespace Rad\MagentoConfigBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Rad\PageBundle\Repository\SearchTraitRepository;

class SupportRepository extends EntityRepository
{
    use SearchTraitRepository;
}