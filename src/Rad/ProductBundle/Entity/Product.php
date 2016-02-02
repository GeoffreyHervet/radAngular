<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\AttributeSet;
use Rad\MagentoConfigBundle\Entity\Category;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\CreativeDesigner;
use Rad\MagentoConfigBundle\Entity\DesignPlace;
use Rad\MagentoConfigBundle\Entity\FashionAccount;
use Rad\MagentoConfigBundle\Entity\Gender;
use Rad\MagentoConfigBundle\Entity\Manufacturer;
use Rad\MagentoConfigBundle\Entity\Origin;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Structure;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\MagentoConfigBundle\Entity\TextLang;
use Rad\MagentoConfigBundle\Entity\Typography;
use Rad\PageBundle\Interfaces\UploadedFiles;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="Rad\ProductBundle\Repository\ProductRepository")
 */
class Product implements UploadedFiles {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @var \DateTime
     * @Assert\NotBlank
     * @ORM\Column(type="datetime", name="online_date")
     */
    protected $onlineDate;

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
     * @var Gender
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Gender")
     */
    protected $gender;

    /**
     * @var DesignPlace
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\DesignPlace")
     */
    protected $designPlace;

    /**
     * @var Structure
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Structure")
     */
    protected $structure;

    /**
     * @var Typography
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Typography")
     */
    protected $typography;

    /**
     * @var TextLang
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\TextLang")
     */
    protected $textLang;

    /**
     * @var Origin
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Origin")
     */
    protected $origin;

    /**
     * @var FashionAccount
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\FashionAccount")
     */
    protected $fashionAccount;

    /**
     * @var CreativeDesigner
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\CreativeDesigner")
     */
    protected $creativeDesigner;

    /**
     * @var Manufacturer
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Manufacturer")
     */
    protected $manufacturer;

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
    protected $boughtPrice = 0;

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
     * @var float
     * @ORM\Column(type="decimal", scale=2, name="special_price")
     */
    protected $specialPrice;

    /**
     * @var ProductFieldTranslated
     * @ORM\OneToMany(targetEntity="ProductFieldTranslated", mappedBy="product", cascade="all")
     */
    protected $translations;

    /**
     * @Assert\Image
     */
    protected $thumbnail;

    /**
     * @Assert\Image
     */
    protected $smallImage;

    /**
     * @Assert\Image
     */
    protected $image;

    /**
     * @Assert\Image
     */
    protected $flatImage;

    /**
     * @ORM\Column(type="string", nullable=true, name="thumbnail_path")
     */
    protected $thumbnailPath;

    /**
     * @ORM\Column(type="string", name="small_image_path", nullable=true)
     */
    protected $smallImagePath;

    /**
     * @ORM\Column(type="string", name="image_path", nullable=true)
     */
    protected $imagePath;

    /**
     * @ORM\Column(type="string", name="flat_image_path", nullable=true)
     */
    protected $flatImagePath;


    /**
     * @ORM\Column(type="string", name="sku_begin", nullable=true)
     *
     */
    protected $skuBegin;

    /**
     * @ORM\ManyToMany(targetEntity="\Rad\MagentoConfigBundle\Entity\Category")
     */
    protected $categories;

    /**
     * @ORM\Column(type="boolean", nullable=false, name="ready_synchronization")
     */
    protected $readySynchronization;

    /**
     * @ORM\Column(type="datetime", nullable=true, name="synchronizedAt")
     */
    protected $synchronizedAt;

    /**
     * @ORM\OneToMany(targetEntity="MagentoProduct", mappedBy="product")
     */
    protected $magentoProducts;

    /**
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\AttributeSet")
     */
    protected $attributeSet;

    /**
     * @ORM\Column(type="boolean", name="is_pretreated")
     */
    protected $isPretreated;

    /**
     * @ORM\Column(type="integer", name="design_cost_category", nullable=true)
     */
    protected $designCostCategory;

    /**
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\DesignColor")
     */
    protected $designColor;

    /**
     * @ORM\Column(type="text")
     */
    protected $spec;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $online;

    /**
     * @ORM\Column(type="string")
     */
    protected $fullSku;

    public static function fieldToTranslate()
    {
        return array(
            'sellPrice',
            'specialPrice',
            'spec',
            'name'
        );
    }

    /**
     * @return array
     */
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
        $this->translations             = new ArrayCollection();
        $this->categories               = new ArrayCollection();
        $this->countries                = new ArrayCollection();
        $this->magentoProducts          = new ArrayCollection();
        $this->readySynchronization     = false;
        $this->online                   = false;
    }

    public function getFullSKU()
    {
        if (!$this->fullSku) {
            $this->setFullSKU();
        }
        return $this->fullSku;
    }

    public function setFullSKU()
    {
        $this->fullSku = implode('_', array(
            $this->getSkuBegin(),
            $this->getSupport() ? $this->getSupport()->getName() : '',
            $this->getColor() ? $this->getColor()->getSkuName() : ''
        ));

        return $this;
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
        $this->setFullSKU();

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
        $this->setFullSKU();

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
        $this->setFullSKU();
    }

    /**
     * @return ArrayCollection
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * @param mixed $categories
     */
    public function setCategories($categories)
    {
        if (is_array($categories)) {
            $categories = new ArrayCollection($categories);
        }
        $this->categories = $categories;
    }

    /**
     * @param Category $category
     * @return Product
     */
    public function addCategory(Category $category)
    {
        $this->categories->add($category);

        return $this;
    }
    /**
     * @param Category $category
     * @return Product
     */
    public function removeCategory(Category $category)
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSynchronizedAt()
    {
        return $this->synchronizedAt;
    }

    /**
     * @param mixed $synchronizedAt
     * @return Product
     */
    public function setSynchronizedAt($synchronizedAt)
    {
        $this->synchronizedAt = $synchronizedAt;

        return $this;
    }

    /**
     * @return bool
     */
    public function isSynchronized()
    {
        return $this->synchronizedAt != null;
    }

    /**
     * @return mixed
     */
    public function getMagentoProducts()
    {
        return $this->magentoProducts;
    }

    /**
     * @param mixed $magentoProducts
     * @return Product
     */
    public function setMagentoProducts($magentoProducts)
    {
        $this->magentoProducts = $magentoProducts;

        return $this;
    }

    /**
     * @param MagentoProduct $product
     * @return Product
     */
    public function addMagentoProduct(MagentoProduct $product)
    {
        $this->magentoProducts->add($product);

        return $this;
    }

    /**
     * @param MagentoProduct $product
     * @return Product
     */
    public function removeMagentoProduct(MagentoProduct $product)
    {
        $this->magentoProducts->removeElement($product);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getReadySynchronization()
    {
        return $this->readySynchronization;
    }

    /**
     * @param mixed $readySynchronization
     * @return Product
     */
    public function setReadySynchronization($readySynchronization)
    {
        $this->readySynchronization = $readySynchronization;

        return $this;
    }

    /**
     * @return AttributeSet
     */
    public function getAttributeSet()
    {
        return $this->attributeSet;
    }

    /**
     * @param mixed $attributeSet
     * @return Product
     */
    public function setAttributeSet($attributeSet)
    {
        $this->attributeSet = $attributeSet;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSpecialPrice()
    {
        return $this->specialPrice;
    }

    /**
     * @param mixed $specialPrice
     * @return Product
     */
    public function setSpecialPrice($specialPrice)
    {
        $this->specialPrice = $specialPrice;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getOnlineDate()
    {
        return $this->onlineDate;
    }

    /**
     * @param mixed $onlineDate
     * @return Product
     */
    public function setOnlineDate($onlineDate)
    {
        $this->onlineDate = $onlineDate;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsPretreated()
    {
        return $this->isPretreated;
    }

    /**
     * @param mixed $isPretreated
     * @return Product
     */
    public function setIsPretreated($isPretreated)
    {
        $this->isPretreated = $isPretreated;

        return $this;
    }

    /**
     * @return \Rad\MagentoConfigBundle\Entity\DesignColor
     */
    public function getDesignCostCategory()
    {
        return $this->designCostCategory;
    }

    /**
     * @param mixed $designCostCategory
     * @return Product
     */
    public function setDesignCostCategory($designCostCategory)
    {
        $this->designCostCategory = $designCostCategory;

        return $this;
    }

    /**
     * @return \Rad\MagentoConfigBundle\Entity\DesignColor
     */
    public function getDesignColor()
    {
        return $this->designColor;
    }

    /**
     * @param mixed $designColor
     * @return Product
     */
    public function setDesignColor($designColor)
    {
        $this->designColor = $designColor;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getThumbnailPath()
    {
        return $this->thumbnailPath;
    }

    /**
     * @param mixed $thumbnailPath
     * @return Product
     */
    public function setThumbnailPath($thumbnailPath)
    {
        $this->thumbnailPath = $thumbnailPath;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSmallImagePath()
    {
        return $this->smallImagePath;
    }

    /**
     * @param mixed $smallImagePath
     * @return Product
     */
    public function setSmallImagePath($smallImagePath)
    {
        $this->smallImagePath = $smallImagePath;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImagePath()
    {
        return $this->imagePath;
    }

    /**
     * @param mixed $imagePath
     * @return Product
     */
    public function setImagePath($imagePath)
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFlatImagePath()
    {
        return $this->flatImagePath;
    }

    /**
     * @param mixed $flatImagePath
     * @return Product
     */
    public function setFlatImagePath($flatImagePath)
    {
        $this->flatImagePath = $flatImagePath;

        return $this;
    }

    /**
     * @return Manufacturer
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * @param Manufacturer $manufacturer
     * @return Product
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSpec()
    {
        return $this->spec;
    }

    /**
     * @param mixed $spec
     */
    public function setSpec($spec)
    {
        $this->spec = $spec;
    }

    /**
     * @return ArrayCollection
     */
    public function getTranslations()
    {
        return $this->translations;
    }

    /**
     * @return ArrayCollection
     */
    public function getTranslationsSortedByCountry()
    {
        $ret = array();
        /** @var ProductFieldTranslated $translation */
        foreach ($this->translations as $translation)
        {
            if (!isset($ret[$translation->getField()])) {
                $ret[$translation->getField()] = array();
            }
            $ret[$translation->getField()][$translation->getCountry()->getName()] = $translation;
        }

        foreach ($ret as &$val) {
            ksort($val);
        }

        return $ret;
    }

    /**
     * @param ArrayCollection $translations
     * @return Product
     */
    public function setTranslations($translations)
    {
        $this->translations = $translations;

        return $this;
    }

    /**
     * @param ProductFieldTranslated $translation
     * @return Product
     */
    public function addTranslation($translation)
    {
        $this->translations->add($translation);

        return $this;
    }


    /**
     * @param ProductFieldTranslated $translation
     * @return Product
     */
    public function removeTranslation($translation)
    {
        $this->translations->removeElement($translation);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getOnline()
    {
        return $this->online;
    }

    /**
     * @param mixed $online
     * @return Product
     */
    public function setOnline($online)
    {
        $this->online = $online;

        return $this;
    }

    /**
     * @return Gender
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * @param Gender $gender
     * @return Product
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * @return DesignPlace
     */
    public function getDesignPlace()
    {
        return $this->designPlace;
    }

    /**
     * @param DesignPlace $designPlace
     * @return Product
     */
    public function setDesignPlace($designPlace)
    {
        $this->designPlace = $designPlace;

        return $this;
    }

    /**
     * @return Structure
     */
    public function getStructure()
    {
        return $this->structure;
    }

    /**
     * @param Structure $structure
     * @return Product
     */
    public function setStructure($structure)
    {
        $this->structure = $structure;

        return $this;
    }

    /**
     * @return Typography
     */
    public function getTypography()
    {
        return $this->typography;
    }

    /**
     * @param Typography $typography
     * @return Product
     */
    public function setTypography($typography)
    {
        $this->typography = $typography;

        return $this;
    }

    /**
     * @return TextLang
     */
    public function getTextLang()
    {
        return $this->textLang;
    }

    /**
     * @param TextLang $textLang
     * @return Product
     */
    public function setTextLang($textLang)
    {
        $this->textLang = $textLang;

        return $this;
    }

    /**
     * @return Origin
     */
    public function getOrigin()
    {
        return $this->origin;
    }

    /**
     * @param Origin $origin
     * @return Product
     */
    public function setOrigin($origin)
    {
        $this->origin = $origin;

        return $this;
    }

    /**
     * @return FashionAccount
     */
    public function getFashionAccount()
    {
        return $this->fashionAccount;
    }

    /**
     * @param FashionAccount $fashionAccount
     * @return Product
     */
    public function setFashionAccount($fashionAccount)
    {
        $this->fashionAccount = $fashionAccount;

        return $this;
    }

    /**
     * @return CreativeDesigner
     */
    public function getCreativeDesigner()
    {
        return $this->creativeDesigner;
    }

    /**
     * @param CreativeDesigner $creativeDesigner
     * @return Product
     */
    public function setCreativeDesigner($creativeDesigner)
    {
        $this->creativeDesigner = $creativeDesigner;

        return $this;
    }
}