<?php

namespace Rad\PageBundle\Traits;

use Doctrine\ORM\Mapping as ORM;

trait Name
{
    /**
     * @var string $name
     *
     * @ORM\Column(name="name", type="string")
     */
    protected $name;

    public function __toString()
    {
        return $this->name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
}