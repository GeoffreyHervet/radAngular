<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="fashion_account")
 * @ORM\Entity
 */
class FashionAccount
{
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;
    use MagentoIdTrait;
}