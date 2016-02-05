<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="color")
 * @ORM\Entity(repositoryClass="Rad\MagentoConfigBundle\Repository\ColorRepository")
 */
class Color {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $hexaColor;

    /**
     * @var string $name
     *
     * @ORM\Column(name="short_name", type="string", unique=true)
     */
    protected $shortName;
    /**
     * @return boolean
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    protected $disabled;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="\Rad\MagentoConfigBundle\Entity\ColorName", mappedBy="color", cascade="all")
     */
    protected $labels;

    public function __construct()
    {
        $this->labels = new ArrayCollection();
    }

    public function getSkuName()
    {
        return strtoupper(str_replace(' ', '', $this->getName()));
    }

    public function __toString()
    {
        return $this->shortName;
    }

    /**
     * @return string
     */
    public function getShortName()
    {
        return $this->shortName;
    }

    /**
     * @param string $shortName
     */
    public function setShortName($shortName)
    {
        $this->shortName = $shortName;
    }

    /**
     * @return mixed
     */
    public function getHexaColor()
    {
        return $this->hexaColor;
    }

    /**
     * @param mixed $hexaColor
     * @return $this
     */
    public function setHexaColor($hexaColor)
    {
        $this->hexaColor = $hexaColor;

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
     * @return bool
     */
    public function getDisabled()
    {
        return $this->disabled;
    }

    /**
     * @param bool $disabled
     * @return Color
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getLabels()
    {
        return $this->labels;
    }

    /**
     * @param ArrayCollection $labels
     * @return Color
     */
    public function setLabels($labels)
    {
        $this->labels = $labels;

        return $this;
    }

    /**
     * @param $label \Rad\MagentoConfigBundle\Entity\ColorName
     * @return Color
     */
    public function addLabel($label)
    {
        $label->setColor($this);
        $this->labels->add($label);

        return $this;
    }

    /**
     * @param $label \Rad\MagentoConfigBundle\Entity\ColorName
     * @return Color
     */
    public function removeLabel($label)
    {
        $this->labels->removeElement($label);

        return $this;
    }
}