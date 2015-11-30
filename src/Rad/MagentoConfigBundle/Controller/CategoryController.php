<?php

namespace Rad\MagentoConfigBundle\Controller;

use Rad\MagentoConfigBundle\Entity\Color;
use Rad\PageBundle\Controller\AutocompleteTraitController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class CategoryController extends Controller
{
    use AutocompleteTraitController;

    public function getEntityName()
    {
        return 'RadMagentoConfigBundle:Category';
    }
}