<?php

namespace Rad\ProductBundle\Processor;

use Symfony\Component\DependencyInjection\ContainerAware;

class SynchronizationProcessor extends ContainerAware
{
    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    protected $manager;

    public function process()
    {
        $this->manager = $this->container->get('doctrine')->getManager();
        $productsToSynchonize = $this->manager->getRepository('RadProductBundle:Product')->findToSynchronize();
    }
}