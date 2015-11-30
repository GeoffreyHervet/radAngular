<?php

namespace Rad\PageBundle\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Rad\PageBundle\Interfaces\UploadedFiles;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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
        $updated = false;

        if (isset(class_uses($entity)['Rad\PageBundle\Traits\Timestamps']))
        {
            $arg->getEntity()->setUpdatedAt(new \DateTime());

            $updated = true;
        }
        $updated = $this->upload($entity) ? true : $updated;
        if ($updated) {
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
        $this->upload($entity);
    }

    public function upload($entity) {
        if (!($entity instanceof UploadedFiles)) {
            return false;
        }

        $updated = false;
        /** @var $entity UploadedFiles */
        foreach ($entity->getFileFields() as $field) {
            $getter = 'get' . ucfirst($field);
            $setter = 'set' . ucfirst($field);

            $directory = $this->container->getParameter('kernel.root_dir').'/../web/uploads';
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true);
            }

            /** @var UploadedFile $file */
            $file = $entity->$getter();
            if ($file instanceof UploadedFile) {
                $updated = true;
                $fileName = implode('.', array(
                    md5(uniqid()),
                    $field,
                    date('Y-m-d-h-i-s'),
                    $file->guessExtension() ?: 'jpg'
                ));
                $file->move($directory, $fileName);
                $entity->$setter($fileName);
            }
        }

        return $updated;
    }
}