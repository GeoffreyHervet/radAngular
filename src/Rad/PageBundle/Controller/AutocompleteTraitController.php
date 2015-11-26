<?php

namespace Rad\PageBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

trait AutocompleteTraitController
{
    public function autocompleteAction(Request $request)
    {
        return new JsonResponse(
            $this->get('doctrine')->getManager()->getRepository(
                $this->getEntityName()
            )->search(
                $request->get('q', ''),
                intval($request->get('page_limit', 10))
            )
        );
    }
}