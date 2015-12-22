<?php

namespace Rad\PageBundle\Processor;

use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\Form;
use Symfony\Component\DependencyInjection\ContainerInterface;

class FormHandler
{
    protected $request;
    protected $em;
    protected $container;

    public function __construct(Request $request, EntityManager $em, ContainerInterface $container)
    {
        $this->request     = $request;
        $this->em         = $em;
        $this->container = $container;
    }

    public function process(Form $form, $data)
    {
        $form->setData($data);

        if ('POST' === $this->request->getMethod() && sizeof($this->request->request) > 0)
        {
            $form->handleRequest($this->request);
            if ($form->isValid())
            {
                $this->em->persist($data);
                $this->em->flush();

                return true;
            }
        }

        return false;
    }
}