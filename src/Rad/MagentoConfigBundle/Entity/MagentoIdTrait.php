<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Rad\PageBundle\Traits;

trait MagentoIdTrait {
    /**
     * @ORM\Column(type="integer", nullable=true)
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