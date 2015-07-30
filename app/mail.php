<?php

if (isset($_GET['e']))
{
mail('geoffrey@raaad.fr', 'BUG JS', $_GET['e']);
}
