<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="attribute_set")
 * @ORM\Entity(repositoryClass="Rad\MagentoConfigBundle\Repository\CategoryRepository")
 */
class AttributeSet {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @ORM\Column(type="integer", nullable=false, unique=true)
     */
    protected $magentoId;

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