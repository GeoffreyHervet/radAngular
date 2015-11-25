<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Support;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/*
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
}