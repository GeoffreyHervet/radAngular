<?php

namespace Rad\PageBundle\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\DependencyInjection\ContainerInterface;

class EntityListener
{
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function preUpdate(PreUpdateEventArgs $arg)
    {
        $entity = $arg->getEntity();
        if (isset(class_uses($entity)['Rad\PageBundle\Traits\Timestamps']))
        {
            $arg->getEntity()->setUpdatedAt(new \DateTime());

            $arg->getEntityManager()->getUnitOfWork()->recomputeSingleEntityChangeSet(
                $arg->getEntityManager()->getClassMetadata(get_class($arg->getEntity())),
                $arg->getEntity()
            );
        }
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if (isset(class_uses($entity)['Rad\PageBundle\Traits\Timestamps']))
        {
            $entity->setCreatedAt(new \DateTime());
            $entity->setUpdatedAt(new \DateTime());
        }
        else {
            die(get_class($entity));
        }
    }
}