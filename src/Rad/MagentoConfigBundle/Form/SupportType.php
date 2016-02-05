<?php

namespace Rad\MagentoConfigBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SupportType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('artShop', 'integer', array(
                'label'     => 'Art shop category ID'
            ))
            ->add('customArtWork', 'choice', array(
                'required'                  => true,
                'label'                     => 'Custom art work',
                'choices'                   => array(
                    '0' => 'No',
                    '1' => 'Yes',
                )
            ))
            ->add('categoryArtshop')
            ->add('sizeInfo')
            ->add('specs', 'collection', array(
                'type'          =>  'rad_magento_admin_supportspec',
                'allow_add'     => false,
                'allow_delete'  => false,
                'data_class'    => null,
            ))
//            ->add('description', 'ckeditor')
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Rad\MagentoConfigBundle\Entity\Support',
            'cascade_validation' => true
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'rad_magento_admin_support';
    }
}
