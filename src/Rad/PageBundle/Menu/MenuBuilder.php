<?php

namespace Rad\PageBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuBuilder {
    /** @var FactoryInterface  */
    private $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createMainMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');

        $menu->addChild('Home', array('route' => 'rad_page_homepage'));

        return $menu;
    }
}