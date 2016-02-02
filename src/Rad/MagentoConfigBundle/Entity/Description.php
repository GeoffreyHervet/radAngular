<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="description")
 * @ORM\Entity(repositoryClass="Rad\MagentoConfigBundle\Repository\DescriptionRepository")
 */
class Description {
    use Traits\Id;
    use Traits\Timestamps;

    /**
     * @var Support
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="Support")
     */
    protected $support;

    /**
     * @var Country
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="Country")
     */
    protected $country;

    /**
     * @var PrintingMethod
     * @Assert\NotBlank
     * @ORM\ManyToOne(targetEntity="PrintingMethod")
     */
    protected $printingMethod;

    /**
     * @var string
     * @Assert\NotBlank
     * @ORM\Column(type="string")
     */
    protected $text;

    public function __toString()
    {
        return $this->text;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return Description
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set support
     *
     * @param \Rad\MagentoConfigBundle\Entity\Support $support
     *
     * @return Description
     */
    public function setSupport(\Rad\MagentoConfigBundle\Entity\Support $support = null)
    {
        $this->support = $support;

        return $this;
    }

    /**
     * Get support
     *
     * @return \Rad\MagentoConfigBundle\Entity\Support
     */
    public function getSupport()
    {
        return $this->support;
    }

    /**
     * Set country
     *
     * @param \Rad\MagentoConfigBundle\Entity\Country $country
     *
     * @return Description
     */
    public function setCountry(\Rad\MagentoConfigBundle\Entity\Country $country = null)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return \Rad\MagentoConfigBundle\Entity\Country
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set printingMethod
     *
     * @param \Rad\MagentoConfigBundle\Entity\PrintingMethod $printingMethod
     *
     * @return Description
     */
    public function setPrintingMethod(\Rad\MagentoConfigBundle\Entity\PrintingMethod $printingMethod = null)
    {
        $this->printingMethod = $printingMethod;

        return $this;
    }

    /**
     * Get printingMethod
     *
     * @return \Rad\MagentoConfigBundle\Entity\PrintingMethod
     */
    public function getPrintingMethod()
    {
        return $this->printingMethod;
    }
}
