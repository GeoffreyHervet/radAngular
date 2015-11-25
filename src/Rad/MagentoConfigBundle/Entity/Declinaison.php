<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="declinaison")
 * @ORM\Entity
 */
class Declinaison {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @var Color
     * @ORM\ManyToOne(targetEntity="Color")
     */
    protected $color;

    /**
     * @var Size
     * @ORM\ManyToOne(targetEntity="Size")
     */
    protected $size;

    /**
     * @var Support
     * @ORM\ManyToOne(targetEntity="Support")
     */
    protected $support;

    /**
     * @return Color
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param Color $color
     * @return Declinaison
     */
    public function setColor($color)
    {
        $this->color = $color;
        $this->generateName();

        return $this;
    }

    /**
     * @return Size
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @param Size $size
     * @return Declinaison
     */
    public function setSize($size)
    {
        $this->size = $size;
        $this->generateName();

        return $this;
    }

    /**
     * @return Support
     */
    public function getSupport()
    {
        return $this->support;
    }

    /**
     * @param Support $support
     * @return Declinaison
     */
    public function setSupport($support)
    {
        $this->support = $support;
        $this->generateName();

        return $this;
    }

    public function generateName()
    {
        if ($this->support && $this->color && $this->size) {
            $this->setName(implode('_', array(
                $this->support->getName(),
                $this->getColor()->getShortName(),
                $this->getSize()->getShortName(),
            )));
        }
    }
}