<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="support")
 * @ORM\Entity(repositoryClass="Rad\MagentoConfigBundle\Repository\SupportRepository")
 */
class Support {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @var string $artShop
     *
     * @ORM\Column(name="art_shop_id", type="integer")
     */
    protected $artShop;

    /**
     * @var string $description
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    protected $description;

    /**
     * @ORM\Column(name="custom_artwork", type="boolean", nullable=false, options={"default": false})
     */
    protected $customArtWork = false;

    /**
     * @ORM\ManyToOne(targetEntity="CategoryArtshop")
     */
    protected $categoryArtshop;

    /**
     * @ORM\ManyToOne(targetEntity="SizeInfo")
     */
    protected $sizeInfo;

    /**
     * @ORM\OneToMany(targetEntity="\Rad\ProductBundle\Entity\Product", mappedBy="support")
     */
    protected $products;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="SupportSpec", mappedBy="support", cascade="all")
     */
    protected $specs;

    /**
     * Support constructor.
     */

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->specs = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function getArtShop()
    {
        return $this->artShop;
    }

    /**
     * @param string $artShop
     */
    public function setArtShop($artShop)
    {
        $this->artShop = $artShop;
    }

    /**
     * @return mixed
     */
    public function getCustomArtWork()
    {
        return $this->customArtWork;
    }

    /**
     * @param mixed $customArtWork
     * @return Support
     */
    public function setCustomArtWork($customArtWork)
    {
        $this->customArtWork = $customArtWork;

        return $this;
    }

    /**
     * @return CategoryArtshop
     */
    public function getCategoryArtshop()
    {
        return $this->categoryArtshop;
    }

    /**
     * @param mixed $categoryArtshop
     * @return Support
     */
    public function setCategoryArtshop($categoryArtshop)
    {
        $this->categoryArtshop = $categoryArtshop;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSizeInfo()
    {
        return $this->sizeInfo;
    }

    /**
     * @param mixed $sizeInfo
     * @return Support
     */
    public function setSizeInfo($sizeInfo)
    {
        $this->sizeInfo = $sizeInfo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     * @return Support
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Support
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * @param $products
     * @return Support
     */
    public function setProducts($products)
    {
        $this->products = $products;

        return $this;
    }

    public function addProduct($product)
    {
        $this->products->add($product);

        return $this;
    }

    public function removeProduct($product)
    {
        $this->products->removeElement($product);

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSpecs()
    {
        return $this->specs;
    }
    /**
     * @param $country Country
     * @return mixed
     */
    public function getSpec($country)
    {
        /** @var SupportSpec $spec */
        foreach ($this->specs as $spec) {
            if ($country == $spec->getCountry()) {
                return $spec;
            }
        }
        return null;
    }

    /**
     * @param mixed $specs
     * @return Support
     */
    public function setSpecs($specs)
    {
        $this->specs = $specs;

        return $this;
    }

    /**
     * @param $spec SupportSpec
     * @return $this
     */
    public function addSpec($spec)
    {
        $spec->setSupport($this);
        $this->specs->add($spec);

        return $this;
    }

    public function removeSpec($spec)
    {
        $this->specs->removeElement($spec);

        return $this;
    }

}