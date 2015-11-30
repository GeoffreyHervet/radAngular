<?php

namespace Rad\MagentoConfigBundle\Entity;

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
}