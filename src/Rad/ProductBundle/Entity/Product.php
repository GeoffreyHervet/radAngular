<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Support;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="product")
 * @ORM\Entity
 */
class Product {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="\Rad\MagentoConfigBundle\Entity\Country")
     */
    protected $countries;

    /**
     * @var Support
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Support")
     */
    protected $support;

    /**
     * @var Color
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Color")
     */
    protected $color;

    /**
     * @var PrintingMethod
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\PrintingMethod")
     */
    protected $printingMethod;

    /**
     * @var float
     * @ORM\Column(type="decimal", scale=2, name="bought_price")
     */
    protected $boughtPrice;

    /**
     * @var float
     * @ORM\Column(type="decimal", scale=2, name="sell_price")
     */
    protected $sellPrice;

    /**
     * @var float
     * @ORM\Column(type="decimal", scale=2, name="artist_amount")
     */
    protected $artistAmount;

    protected $pictures;
    protected $design;

    /**
     * Product constructor.
     */
    public function __construct()
    {
        $this->countries = new ArrayCollection();
    }

    /**
     * Set boughtPrice
     *
     * @param string $boughtPrice
     *
     * @return Product
     */
    public function setBoughtPrice($boughtPrice)
    {
        $this->boughtPrice = $boughtPrice;

        return $this;
    }

    /**
     * Get boughtPrice
     *
     * @return string
     */
    public function getBoughtPrice()
    {
        return $this->boughtPrice;
    }

    /**
     * Set sellPrice
     *
     * @param string $sellPrice
     *
     * @return Product
     */
    public function setSellPrice($sellPrice)
    {
        $this->sellPrice = $sellPrice;

        return $this;
    }

    /**
     * Get sellPrice
     *
     * @return string
     */
    public function getSellPrice()
    {
        return $this->sellPrice;
    }

    /**
     * Set artistAmount
     *
     * @param string $artistAmount
     *
     * @return Product
     */
    public function setArtistAmount($artistAmount)
    {
        $this->artistAmount = $artistAmount;

        return $this;
    }

    /**
     * Get artistAmount
     *
     * @return string
     */
    public function getArtistAmount()
    {
        return $this->artistAmount;
    }

    /**
     * Add country
     *
     * @param \Rad\MagentoConfigBundle\Entity\Country $country
     *
     * @return Product
     */
    public function addCountry(\Rad\MagentoConfigBundle\Entity\Country $country)
    {
        $this->countries[] = $country;

        return $this;
    }

    /**
     * Remove country
     *
     * @param \Rad\MagentoConfigBundle\Entity\Country $country
     */
    public function removeCountry(\Rad\MagentoConfigBundle\Entity\Country $country)
    {
        $this->countries->removeElement($country);
    }

    /**
     * Get countries
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCountries()
    {
        return $this->countries;
    }

    /**
     * Set support
     *
     * @param \Rad\MagentoConfigBundle\Entity\Support $support
     *
     * @return Product
     */
    public function setSupport(\Rad\MagentoConfigBundle\Entity\Support $support = null)
    {
        $this->support = $support;

        return $this;
    }

    /**
     * Get support
     *
     * @return \Rad\MagentoConfigBundle\Entity\Support
     */
    public function getSupport()
    {
        return $this->support;
    }

    /**
     * Set color
     *
     * @param \Rad\MagentoConfigBundle\Entity\Color $color
     *
     * @return Product
     */
    public function setColor(\Rad\MagentoConfigBundle\Entity\Color $color = null)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color
     *
     * @return \Rad\MagentoConfigBundle\Entity\Color
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set printingMethod
     *
     * @param \Rad\MagentoConfigBundle\Entity\PrintingMethod $printingMethod
     *
     * @return Product
     */
    public function setPrintingMethod(\Rad\MagentoConfigBundle\Entity\PrintingMethod $printingMethod = null)
    {
        $this->printingMethod = $printingMethod;

        return $this;
    }

    /**
     * Get printingMethod
     *
     * @return \Rad\MagentoConfigBundle\Entity\PrintingMethod
     */
    public function getPrintingMethod()
    {
        return $this->printingMethod;
    }
}
