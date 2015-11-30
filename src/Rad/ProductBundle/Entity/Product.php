<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\PageBundle\Interfaces\UploadedFiles;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="product")
 * @ORM\Entity
 */
class Product implements UploadedFiles {
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

    /**
     * @ORM\Column(type="string")
     *
     * @Assert\File
     */
    protected $thumbnail;

    /**
     * @ORM\Column(type="string", name="small_image")
     *
     * @Assert\File
     */
    protected $smallImage;

    /**
     * @ORM\Column(type="string", name="image")
     *
     * @Assert\File
     */
    protected $image;

    /**
     * @ORM\Column(type="string", name="flat_image")
     *
     * @Assert\File
     */
    protected $flatImage;

    /**
     * @ORM\Column(type="string", name="sku_begin")
     *
     */
    protected $skuBegin;

    public function getFileFields()
    {
        return array(
            'thumbnail',
            'smallImage',
            'image',
            'flatImage'
        );
    }

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

    /**
     * @return mixed
     */
    public function getThumbnail()
    {
        return $this->thumbnail;
    }

    /**
     * @param mixed $thumbnail
     */
    public function setThumbnail($thumbnail)
    {
        $this->thumbnail = $thumbnail;
    }

    /**
     * @return mixed
     */
    public function getSmallImage()
    {
        return $this->smallImage;
    }

    /**
     * @param mixed $smallImage
     */
    public function setSmallImage($smallImage)
    {
        $this->smallImage = $smallImage;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param mixed $image
     */
    public function setImage($image)
    {
        $this->image = $image;
    }

    /**
     * @return mixed
     */
    public function getFlatImage()
    {
        return $this->flatImage;
    }

    /**
     * @param mixed $flatImage
     */
    public function setFlatImage($flatImage)
    {
        $this->flatImage = $flatImage;
    }

    /**
     * @return mixed
     */
    public function getDesign()
    {
        return $this->design;
    }

    /**
     * @param mixed $design
     */
    public function setDesign($design)
    {
        $this->design = $design;
    }

    /**
     * @return mixed
     */
    public function getSkuBegin()
    {
        return $this->skuBegin;
    }

    /**
     * @param mixed $skuBegin
     */
    public function setSkuBegin($skuBegin)
    {
        $this->skuBegin = $skuBegin;
    }
}
