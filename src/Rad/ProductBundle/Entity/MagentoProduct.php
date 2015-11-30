<?php

namespace Rad\ProductBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Rad\MagentoConfigBundle\Entity\Category;
use Rad\MagentoConfigBundle\Entity\Color;
use Rad\MagentoConfigBundle\Entity\PrintingMethod;
use Rad\MagentoConfigBundle\Entity\Support;
use Rad\PageBundle\Interfaces\UploadedFiles;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="magento_product")
 * @ORM\Entity
 */
class MagentoProduct {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;

    /**
     * @ORM\ManyToOne(targetEntity="Product", inversedBy="magentoProducts")
     */
    protected $product;

    /**
     * @ORM\Column(type="string", name="product_type")
     */
    protected $type;

    /**
     * @return mixed
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * @param Product $product
     * @return MagentoProduct
     */
    public function setProduct($product)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     * @return MagentoProduct
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

}
