<?php
$defaultCountry = 'fr';
try {
       $ip = $_SERVER['REMOTE_ADDR'];
       $countryMapping = array('US' => 'us', 'AT' => 'de', 'DE' => 'de',  'GB' => 'uk');
       $country = geoip_country_code_by_name($ip);
       $country = isset($countryMapping[$country]) ? $countryMapping[$country] : $defaultCountry;
} catch (\Exception $e) {
       $country = $defaultCountry;
}

die($country);
