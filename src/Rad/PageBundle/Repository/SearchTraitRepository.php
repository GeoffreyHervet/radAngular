<?php


namespace Rad\PageBundle\Repository;

trait SearchTraitRepository
{
    public function search($q, $limit, $field = 'e.name')
    {
        return $this
            ->createQueryBuilder('e')
            ->select('e.id', $field . ' as text')
            ->andWhere($field . ' LIKE :pattern')
            ->setParameter('pattern', '%'. $q .'%')
            ->setMaxResults($limit)
            ->addOrderBy($field)

            ->getQuery()->getResult()
        ;
    }
}