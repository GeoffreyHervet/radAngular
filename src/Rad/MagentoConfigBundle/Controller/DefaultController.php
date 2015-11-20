<?php

namespace Rad\MagentoConfigBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('RadMagentoConfigBundle:Default:index.html.twig', array('name' => $name));
    }
}
