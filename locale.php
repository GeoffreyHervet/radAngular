<?php
$dir =  './app/scripts/config/locale/';

function asArray($obj) { $ret = array(); foreach ($obj as $key => $val) { $ret[$key] = (is_object($val)) ? asArray($val) : $val; } return $ret; }
function subs($trads, $hash, $base = '') { foreach($hash as $key => $val) { if (is_string($val)) { $trads[$base . $key] = $val; } else { $trads = subs($trads, $val, $base . $key . '.'); } } return $trads; }

if (isset($_POST, $_POST['trad'])) {
    foreach ($_POST['trad'] as $lang => $data) {
        file_put_contents($dir . '_' . $lang . '.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}

$trads = array();
foreach (scandir($dir) as $file) {
    if (!fnmatch('_*.json', $file)) {
        continue;
    }

    $lang = substr(substr($file, 1), 0, -5);
    $trads[$lang] = subs(array(), asArray(json_decode(file_get_contents($dir . $file))));
}

echo '<form action="" method="POST"><table>';
echo '<thead><tr><th>Uniq code</th>';
foreach ($trads as $lang => $data) { echo '<th align="center">'. $lang .'</th>'; }
echo '</tr></thead><tbody>';

foreach ($trads['fr'] as $key => $val) {
    echo '<tr>';
    echo '<td>', $key, '</td>';
    foreach ($trads as $lang => $data) {
        echo '<td><input autocomplete="off" type="text" name="trad['. $lang .']['. $key .']" value="'. $data[$key] . '" size="50" /></td>';
    }
    echo '</tr>';
}
echo '</tbody></table> <br /><br /><br /><br /> <center><input type="submit" style="background:red;color:white;padding:15px 40px;font-size:15px;border:0" value="SUBMIT"></center> </form>';
