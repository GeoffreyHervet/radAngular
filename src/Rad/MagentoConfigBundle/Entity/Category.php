<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="category")
 * @ORM\Entity(repositoryClass="Rad\MagentoConfigBundle\Repository\CategoryRepository")
 */
class Category {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @ORM\Column(type="integer", nullable=false, unique=true)
     */
    protected $magentoId;

    /**
     * @ORM\ManyToOne(targetEntity="Category")
     */
    protected $parent;

    public function __toString()
    {
        if ($this->parent) {
            return $this->parent . ' / ' . $this->name;
        }
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param mixed $parent
     * @return Category
     */
    public function setParent($parent)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getMagentoId()
    {
        return $this->magentoId;
    }

    /**
     * @param mixed $magentoId
     * @return Category
     */
    public function setMagentoId($magentoId)
    {
        $this->magentoId = $magentoId;

        return $this;
    }
}