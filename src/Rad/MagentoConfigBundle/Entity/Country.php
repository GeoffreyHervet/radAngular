<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="country")
 * @ORM\Entity
 */
class Country {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @Assert\NotBlank
     * @ORM\Column(type="integer", name="magento_store_id", nullable=false, unique=true)
     */
    protected $magentoStoreId;

    /**
     * @ORM\Column(type="boolean", name="is_international")
     */
    protected $isInternational;

    /**
     * @var string $locale
     *
     * @ORM\Column(name="locale", type="string")
     */
    protected $locale;

    public function __toString()
    {
        return $this->name;
    }

    public function __construct()
    {
        $this->isInternational = false;
    }

    /**
     * @return mixed
     */
    public function getMagentoStoreId()
    {
        return $this->magentoStoreId;
    }

    /**
     * @param mixed $magentoStoreId
     * @return $this
     */
    public function setMagentoStoreId($magentoStoreId)
    {
        $this->magentoStoreId = $magentoStoreId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsInternational()
    {
        return $this->isInternational;
    }

    /**
     * @param mixed $isInternational
     * @return $this
     */
    public function setIsInternational($isInternational)
    {
        $this->isInternational = $isInternational;

        return $this;
    }

    /**
     * @return string
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * @param string $locale
     * @return Country
     */
    public function setLocale($locale)
    {
        $this->locale = $locale;

        return $this;
    }
}