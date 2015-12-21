<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\Country;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="product_field_translated")
 * @ORM\Entity
 * ORM\Entity(repositoryClass="Rad\ProductBundle\Repository\ProductRepository")
 */
class ProductFieldTranslated
{
    use Traits\Id;
    use Traits\Timestamps;

    /**
     * @var Country
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Country")
     */
    protected $country;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=false)
     */
    protected $field;

    /**
     * @var Product
     * @ORM\ManyToOne(targetEntity="Product", inversedBy="translations")
     */
    protected $product;

    /**
     * @var string
     *
     * @Assert\NotBlank
     * @ORM\Column(type="string", nullable=true)
     */
    protected $value;

    public function __construct(Product $product, Country $country = null, $field = null)
    {
        $this->product = $product;
        $this->country = $country;
        $this->field = $field;
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param Country $country
     * @return ProductFieldTranslated
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return string
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @param string $field
     * @return ProductFieldTranslated
     */
    public function setField($field)
    {
        $this->field = $field;

        return $this;
    }

    /**
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param string $value
     * @return ProductFieldTranslated
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * @return Product
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * @param Product $product
     * @retunr ProductFieldTranslated
     */
    public function setProduct($product)
    {
        $this->product = $product;

        return $this;
    }
}