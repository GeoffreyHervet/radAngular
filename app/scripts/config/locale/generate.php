<?php

$dir = __DIR__ . '/';

function getContent($lang, $data) {
    $ret = <<<EOL
"use strict";

angular
  .module('angularApp')
  .config(function (\$translateProvider) {
    \$translateProvider.translations('${lang}', ${data});
  })
;
EOL;

    return $ret;
}

foreach (scandir($dir) as $file) {
    if (!fnmatch('_*.json', $file)) {
        continue;
    }

    $lang = substr(substr($file, 1), 0, -5);

    $newFile = $lang . '.js';
    file_put_contents($dir . $newFile, getContent($lang, file_get_contents($dir . $file)));
}