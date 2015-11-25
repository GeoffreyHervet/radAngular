<?php

namespace Rad\PageBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuBuilder
{
    /** @var FactoryInterface */
    private $factory;

    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createMainMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');

        $menu->addChild('Home', array('route' => 'rad_page_homepage'));
        $menu->addChild('Users', array('route' => 'admin_user_index'));
        $magento = $menu->addChild('Magento')->setAttribute('dropdown', true);

        foreach (array(
                     'country',
                     'color',
                     'support',
                     'size',
                     'declinaison'
                 ) as $item) {
            $magento->addChild(ucfirst($item), array('route' => 'rad_magento_admin_' . $item . '_index'));
        }
        return $menu;
    }
}