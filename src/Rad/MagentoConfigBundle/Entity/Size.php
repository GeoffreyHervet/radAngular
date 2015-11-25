<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="size")
 * @ORM\Entity
 */
class Size
{
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

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
}