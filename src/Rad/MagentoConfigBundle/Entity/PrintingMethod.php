<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="printing_method")
 * @ORM\Entity
 */
class PrintingMethod {
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;
}