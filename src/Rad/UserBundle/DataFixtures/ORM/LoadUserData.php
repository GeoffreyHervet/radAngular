<?php

namespace Rad\UserBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class LoadUserData implements FixtureInterface, ContainerAwareInterface, OrderedFixtureInterface
{
    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setUsername('geoffrey');
        $user->setEmail('geoffrey@raaad.fr');
        $user->setPlainPassword('password');
        $user->setEnabled(true);
        $user->setRoles(array('ROLE_SUPER_ADMIN'));

        // Update the user
        $userManager->updateUser($user, true);
    }

    public function getOrder() {
        return -1;
    }
}