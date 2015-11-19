<?php

namespace Rad\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class RadUserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
