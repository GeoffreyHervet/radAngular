<?php

namespace Rad\PageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        die('ICI');
        if (!$this->get('security.authorization_checker')->isGranted('IS_FULLY_AUTHENTICATED')) {
            return $this->redirectToRoute('fos_user_security_login');
        }
    }
}