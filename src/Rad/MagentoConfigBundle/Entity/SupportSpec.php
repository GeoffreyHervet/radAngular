<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Entity
 * @ORM\Table(name="support_spec")
 */
class SupportSpec {
    use Traits\Id;

    /**
     * @var string
     *
     * @Assert\NotBlank
     * @ORM\Column(name="content", type="text")
     */
    protected $content;

    /**
     * @var Support
     * @ORM\ManyToOne(targetEntity="Support", inversedBy="specs")
     */
    protected $support;

    /**
     * @var Country
     * @ORM\ManyToOne(targetEntity="Country")
     */
    protected $country;

    public function __toString()
    {
        return $this->content;
    }

    public function __construct($support = null, $country = null)
    {
        $this->support = $support;
        $this->country = $country;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     * @return SupportSpec
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSupport()
    {
        return $this->support;
    }

    /**
     * @param mixed $support
     * @return SupportSpec
     */
    public function setSupport($support)
    {
        $this->support = $support;

        return $this;
    }

    /**
     * @return Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param Country $country
     * @return SupportSpec
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }
}