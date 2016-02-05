<?php

namespace Rad\MagentoConfigBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ColorType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('shortName')
            ->add('hexaColor')
            ->add('disabled')
            ->add('labels', 'collection', array(
                'type'          =>  'rad_magento_admin_colorname',
                'allow_add'     => false,
                'allow_delete'  => false,
                'data_class'    => null,
            ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rad\MagentoConfigBundle\Entity\Color'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rad_magento_admin_color';
    }
}
