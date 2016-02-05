<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="color_name")
 * @ORM\Entity
 */
class ColorName {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @var \Rad\MagentoConfigBundle\Entity\Color
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Color", inversedBy="labels")
     */
    protected $color;

    /**
     * @var \Rad\MagentoConfigBundle\Entity\Country
     * @ORM\ManyToOne(targetEntity="\Rad\MagentoConfigBundle\Entity\Country")
     */
    protected $country;

    public function __construct($color, $country)
    {
        $this->setColor($color);
        $this->setCountry($country);
    }

    /**
     * @return \Rad\MagentoConfigBundle\Entity\Color
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param \Rad\MagentoConfigBundle\Entity\Color $color
     * @return ColorName
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * @return \Rad\MagentoConfigBundle\Entity\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param \Rad\MagentoConfigBundle\Entity\Country $country
     * @return ColorName
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }
}