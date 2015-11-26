<?php

namespace Rad\MagentoConfigBundle\Entity;

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
     * @var string $name
     *
     * @ORM\Column(name="art_shop_id", type="integer")
     */
    protected $artShop;

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
}