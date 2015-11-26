<?php

namespace Rad\ProductBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProductType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('countries', null, array(
                'expanded'      => true,
                'multiple'      => true
            ))

            ->add('support', 'tetranz_select2entity', array(
                'multiple'                  => false,
                'class'                     => 'Rad\MagentoConfigBundle\Entity\Support',
                'text_property'             => 'name',
                'minimum_input_length'      => 2,
                'placeholder'               => 'Choose a support',
                'required'                  => true,
                'page_limit'                => 20,
                'remote_route'              => 'rad_magento_admin_support_autocomplete'
            ))
            ->add('color')
            ->add('printingMethod')

            ->add('boughtPrice')
            ->add('sellPrice')
            ->add('artistAmount')

            ->add('name')
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rad\ProductBundle\Entity\Product'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rad_productbundle_product';
    }
}
