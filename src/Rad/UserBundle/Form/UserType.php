<?php

namespace Rad\UserBundle\Form;


use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Validator\Constraints\NotBlank;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;

class UserType extends BaseType
{
    /** @var array */
    protected $roles;
    /** @var  ContainerInterface  */
    protected $container;
    protected $class;

    public function __construct(array $roles, ContainerInterface $container)
    {
        $this->roles  = $roles;
        $this->container = $container;
        $this->class = 'Rad\UserBundle\Entity\User';
        parent::__construct($this->class);
    }

    protected function getRoles()
    {
        $roles = array();
        foreach ($this->roles as $role => $extend) {
            $roles[$role] = $role;
            if (!empty($extend)) {
                foreach ($extend as $role) {
                    $roles[$role] = $role;
                }
            }
        }
        return $roles;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        if ($options['item'] === null or $options['item']->getId() === null)
        {
            $builder
                ->add('plainPassword', 'password', array(
                    'required'        => true,
                    'label'            => 'Password',
                    'constraints'    => new NotBlank(),
                ));
        }
        else
        {
            $builder
                ->add('plainPassword', 'password', array(
                    'required'        => false,
                    'label'            => 'Password',
                ));
        }

        $builder
            ->add('enabled', 'choice', array(
                'choices'        => array('No', 'Yes'),
                'empty_data'    => 1,
                'empty_value'    =>false,
                'multiple'        => false,
                'expanded'        => true,
                'required'        => false,
                'label'            => 'Enabled ?'
            ))
            ->add('roles', 'choice', array(
                'choices'        => $this->getRoles(),
                'multiple'        => true,
                'expanded'        => true,
                'required'        => false,
                'label'            => 'Roles'
            ))
        ;
    }
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class'    => $this->class,
            'item'          => null,
            'intention'  => 'registration',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rad_userbundle_usertype';
    }
}
