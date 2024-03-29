<?php

namespace Rad\MagentoConfigBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CountryType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('isInternational', 'checkbox', array(
                'label'     => 'International ?',
                'required'  => false
            ))
            ->add('magentoStoreId')
            ->add('locale')
            ->add('code')
            ->add('lang')
            ->add('colorLabel')
            ->add('artistLabel')
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rad\MagentoConfigBundle\Entity\Country',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rad_magento_admin_country';
    }
}
