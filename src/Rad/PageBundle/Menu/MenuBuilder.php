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

        $menu->addChild('Users', array('route' => 'admin_user_index'));

        $magento = $menu->addChild('Magento')->setAttribute('dropdown', true);

        foreach (array(
                     'country',
                     'color',
                     'support',
                     'size',
                     'declinaison',
                     'printing_method'
                 ) as $item) {
            $magento->addChild(ucfirst(str_replace('_', ' ', $item)), array('route' => 'rad_magento_admin_' . $item . '_index'));
        }

        $menu->addChild('Products', array('route' => 'rad_product_index'));
        $menu->addChild('www.rad.co', array('uri' => 'http://www.rad.co'));
        return $menu;
    }
}