<?php

if (isset($_GET['e']))
{
mail('geoffrey@raaad.fr', 'noreply@rad.co', 'BUG', $_GET['e']);
}
