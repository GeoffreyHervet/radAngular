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
            ->add('color', 'tetranz_select2entity', array(
                'multiple'                  => false,
                'class'                     => 'Rad\MagentoConfigBundle\Entity\Color',
                'text_property'             => 'name',
                'minimum_input_length'      => 2,
                'placeholder'               => 'Choose a color',
                'required'                  => true,
                'page_limit'                => 20,
                'remote_route'              => 'rad_magento_admin_color_autocomplete'
            ))
            ->add('printingMethod')
//            ->add('boughtPrice', 'number')
            ->add('sellPrice', 'number')
            ->add('artistAmount', 'number')
            ->add('specialPrice', 'number')
            ->add('designColor')
            ->add('onlineDate', 'date', array(
                'years' => range(date('Y'), date('Y') + 5),
            ))
            ->add('isPretreated', 'choice', array(
                'required'                  => true,
                'choices'                   => array(
                    '0' => 'No',
                    '1' => 'Yes',
                )
            ))
            ->add('designCostCategory', null, array(
                'required'  => false
            ))
            ->add('name')
            ->add('skuBegin')
            ->add('readySynchronization', 'choice', array(
                'required'                  => true,
                'label'                     => 'Ready for synchronization',
                'choices'                   => array(
                    '0' => 'No',
                    '1' => 'Yes',
                )
            ))
            ->add('online', 'choice', array(
                'required'                  => true,
                'label'                     => 'Online product ?',
                'choices'                   => array(
                    '0' => 'No',
                    '1' => 'Yes',
                )
            ))
            ->add('attributeSet')
            ->add('categories', 'tetranz_select2entity', array(
                'multiple'                  => true,
                'class'                     => 'Rad\MagentoConfigBundle\Entity\Category',
                'text_property'             => 'name',
                'minimum_input_length'      => 4,
                'placeholder'               => 'Choose a category',
                'required'                  => true,
                'page_limit'                => 20,
                'remote_route'              => 'rad_magento_category_autocomplete'
            ))

            ->add('thumbnail', null, array(
                'required'      => false,
                'data_class'    => null
            ))
            ->add('smallImage', null, array(
                'required'      => false,
                'data_class'    => null
            ))
            ->add('image', null, array(
                'required'      => false,
                'data_class'    => null
            ))
            ->add('flatImage', null, array(
                'required'      => false,
                'data_class'    => null
            ))
            ->add('manufacturer')
            ->add('gender', null, array(
                'required'      => true
            ))
            ->add('designPlace', null, array(
                'required'      => true
            ))
            ->add('structure', null, array(
                'required'      => true
            ))
            ->add('typography', null, array(
                'required'      => true
            ))
            ->add('textLang', null, array(
                'required'      => true
            ))
            ->add('origin', null, array(
                'required'      => true
            ))
            ->add('fashionAccount', null, array(
                'required'      => true
            ))
            ->add('creativeDesigner', null, array(
                'required'      => true
            ))
            ->add('spec')
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
