<?php

session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

if (isset($HTTP_RAW_POST_DATA) && (!isset($_POST) || empty($_POST))) {
        $_POST =(array) json_decode($HTTP_RAW_POST_DATA);
}
$_GET['sandbox']=0;
unset($_GET['sandbox']);

define('EMAIL_ADD', 'geoffrey@rad.co');
define('PAYPAL_EMAIL_ADD', 'accountpaypal-facilitator@raaad.fr'); // facilitator email which will receive payments change this email to a live paypal account id when the site goes live
require_once('paypal_class.php');

$p                              = new paypal_class(); // paypal class
$p->admin_mail  = EMAIL_ADD; // set notification email
$action                 = $_REQUEST["action"];

/*
 * POST:
 *  cur => EUR|USD,
 *  id  => cart id
 *  v   => ammount
 *  f   => fistname
 *  l   => lastname
 *  a   => address
 *  c   => city
 *  s   => state
 *  z   => zip
 *  cn  => country
 * mail => customer email
 *  url => CART URL
 */

switch($action){
    case "process": // case process insert the form data in DB and process to the paypal
        $this_script = 'https://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];

        $data = array(
            'action'            => 'process',
            'cmd'               => '_cart',
            'currency_code'     => $_POST['cur'],
            'invoice'           => $_POST['id'],
            'product_id'        => 1,
            'product_name'      => 'RAD',
            'product_quantity'  => 1,
            'product_amount'    => floatval(str_replace(',','.',$_POST['v'])),
            'payer_fname'       => $_POST['f'],
            'payer_lname'       => $_POST['l'],
            'payer_address'     => $_POST['a'],
            'payer_city'        => $_POST['c'],
            'payer_state'       => $_POST['s'],
            'payer_zip'         => $_POST['z'],
            'payer_country'     => $_POST['cn'],
            'payer_email'       => isset($_POST['mail']) ? $_POST['mail'] : '',
        );

        $_SESSION['data'] = $data;
        $_SESSION['invoice'] = $data['invoice'];

        file_put_contents('./tmp-log-'. md5($data['invoice']), json_encode($data));

        $p->add_field('business',       PAYPAL_EMAIL_ADD);
        $p->add_field('cmd',            $data['cmd']);
        $p->add_field('upload',         '1');
        $p->add_field('return',         $this_script.'?action=success&invoice='. $data['invoice'] . '&store='. $_GET['store']);
        $p->add_field('cancel_return',  $this_script.'?action=cancel&invoice='. $data['invoice'] .'&store='. $_GET['store']);
        $p->add_field('notify_url',     $this_script.'?action=ipn');
        $p->add_field('currency_code',  $data['currency_code']);
        $p->add_field('invoice',        $data['invoice']);
        $p->add_field('item_name_1',    $data['product_name']);
        $p->add_field('item_number_1',  $data['product_id']);
        $p->add_field('quantity_1',     $data['product_quantity']);
        $p->add_field('amount_1',       $data['product_amount']);
        $p->add_field('first_name',     $data['payer_fname']);
        $p->add_field('last_name',      $data['payer_lname']);
        $p->add_field('address1',       $data['payer_address']);
        $p->add_field('city',           $data['payer_city']);
        $p->add_field('state',          $data['payer_state']);
        $p->add_field('country',        $data['payer_country']);
        $p->add_field('zip',            $data['payer_zip']);
        $p->add_field('email',          $data['payer_email']);
        $p->submit_paypal_post();
        // $p->dump_fields();
        break;

    case 'success':
        $invoice = $_GET['invoice'];
        $file = './tmp-log-'. md5($invoice) . '-success';
        $content = (array)json_decode(file_get_contents($file));
        $increment = $content['increment'];
        $id = $content['id'];
	if (!$increment || !$id) {
		echo '<body style="background: url(./loader.gif) no-repeat center center"><script type="text/javascript">setTimeout(function(){ location.reload(); }, 1000);</script></body>';
	}
        $url = '/#/'. $_GET['store'] .'/cart/success/'. $id .'/'. $increment;
        header('Location: '. $url);
        die;
    case 'cancel': // case cancel to show user the transaction was cancelled
	header('Location: /#/'. $_GET['store'] .'/cart/confirmation');
        break;

    case 'ipn': // IPN case to receive payment information. this case will not displayed in browser. This is server to server communication. PayPal will send the transactions each and every details to this case in secured POST menthod by server to server.
        $trasaction_id  = $_POST["txn_id"];
        $payment_status = strtolower($_POST["payment_status"]);
        $invoice        = $_POST['invoice'];
        $file           = './tmp-log-'. md5($invoice);
        if (!file_exists($file)) {
            mail('geoffrey@raaad.fr', 'Paypal fail', print_r($_POST,1));
        }
        if (file_exists($file)) {
            mail('geoffrey@raaad.fr', 'Paypal success', print_r($_POST,1));
        }

        $data = (array) json_decode(file_get_contents($file));
        if ($p->validate_ipn()) {

            $response = file_get_contents('http://preprod2.rad.co/fr/raaad_xmlconnect/cart/paypalmobile/app_code/fr_iph1?invoice='. $invoice . '&ref=' . $_POST['txn_id']);
            $matches = array();
            preg_match('#<id>(.+)</id>#', $response, $matches);
            $data['id'] = $matches[1];
            preg_match('#<increment>(.+)</increment>#', $response, $matches);
            $data['increment'] = $matches[1];
            $data['success'] = 1;
            //$data['increment'] = '100123123';
            //$data['id'] = 12394421;
            file_put_contents($file. '-success', json_encode($data));
            $subject = 'Instant Payment Notification - Received Payment';
            $p->send_report($subject);
        }else{
            $data['success'] = 0;
            file_put_contents($file, json_encode($data));
            $subject = 'Instant Payment Notification - Payment Fail';
            $p->send_report($subject); // failed notification
        }
        break;
}
