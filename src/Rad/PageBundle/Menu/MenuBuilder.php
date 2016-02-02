<?php

namespace Rad\PageBundle\Menu;

use Knp\Menu\FactoryInterface;
use Rad\UserBundle\Entity\User;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class MenuBuilder
{
    /** @var FactoryInterface */
    private $factory;

    /** @var TokenStorage */
    private $token;

    /**
     * MenuBuilder constructor.
     * @param FactoryInterface $factory
     * @param TokenStorage $tokenStorage
     */

    public function __construct(FactoryInterface $factory, TokenStorage $tokenStorage)
    {
        $this->factory      = $factory;
        $this->token        = $tokenStorage;
    }

    /**
     * @return User | null
     */
    public function getUser()
    {
        $token = $this->token->getToken();
        if (!is_object($user = $token->getUser())) {
            return null;
        }

        return $user;
    }

    public function hasRole($role)
    {
        $user = $this->getUser();
        return $user != null && $user->hasRole($role);
    }

    public function createMainMenu(RequestStack $requestStack)
    {
        $menu = $this->factory->createItem('root');

        if ($this->hasRole('ROLE_SUPER_ADMIN')) {
            $menu->addChild('Users', array('route' => 'admin_user_index'));
        }

        if ($this->hasRole('ROLE_ADMIN')) {
            $magento = $menu->addChild('Magento')->setAttribute('dropdown', true);

            foreach (array(
                         'description',
                         'country',
                         'color',
                         'support',
                         'size',
                         'declinaison',
                         'printing_method'
                     ) as $item) {
                $magento->addChild(ucfirst(str_replace('_', ' ', $item)), array('route' => 'rad_magento_admin_' . $item . '_index'));
            }
        }

        if ($this->hasRole('ROLE_PRODUCT')) {
            $menu->addChild('Products', array('route' => 'rad_product_index'));
        }

        $menu->addChild('www.rad.co', array('uri' => 'http://www.rad.co'));
        return $menu;
    }
}