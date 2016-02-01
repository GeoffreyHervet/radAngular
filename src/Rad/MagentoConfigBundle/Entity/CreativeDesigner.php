<?php

namespace Rad\MagentoConfigBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Rad\PageBundle\Traits;

/**
 * @ORM\Table(name="creative_designer")
 * @ORM\Entity
 */
class CreativeDesigner
{
    use Traits\Id;
    use Traits\Timestamps;
    use Traits\Name;
    use MagentoIdTrait;
}