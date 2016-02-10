<?php

namespace Rad\MagentoConfigBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\Declinaison;
use Rad\PageBundle\Repository\SearchTraitRepository;

class ColorRepository extends EntityRepository
{
    public function search($q, $limit, $field = 'e.name')
    {
        $q = '';$limit = 10000;
        $colors = $this
            ->createQueryBuilder('e')
            ->andWhere($field . ' LIKE :pattern')
            ->andWhere('e.disabled != 1')
            ->setParameter('pattern', '%'. $q .'%')
            ->setMaxResults($limit)
            ->addOrderBy($field)

            ->getQuery()->getResult()
            ;

        $ret = array();
        /** @var Color $color */
        foreach ($colors as $color) {
            if (!$color->getDeclinaisons()->isEmpty()) {
                $ret[] = array('id' => $color->getId(), 'text' => $color->getName() . ' (' .$color->getDeclinaisons()->count() .')');
            }
        }

        return $ret;
    }
}