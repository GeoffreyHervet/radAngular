<?php

session_start();

define('EMAIL_ADD', 'geoffrey@rad.co');
define('PAYPAL_EMAIL_ADD', 'accountpaypal-facilitator@raaad.fr'); // facilitator email which will receive payments change this email to a live paypal account id when the site goes live
require_once('paypal_class.php'); 

$p 				= new paypal_class(); // paypal class
$p->admin_mail 	= EMAIL_ADD; // set notification email
$action 		= $_REQUEST["action"];

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
//		mysql_query("INSERT INTO `purchases` (`invoice`, `product_id`, `product_name`, `product_quantity`, `product_amount`, `payer_fname`, `payer_lname`, `payer_address`, `payer_city`, `payer_state`, `payer_zip`, `payer_country`, `payer_email`, `payment_status`, `posted_date`) VALUES ('".$_POST["invoice"]."', '".$_POST["product_id"]."', '".$_POST["product_name"]."', '".$_POST["product_quantity"]."', '".$_POST["product_amount"]."', '".$_POST["payer_fname"]."', '".$_POST["payer_lname"]."', '".$_POST["payer_address"]."', '".$_POST["payer_city"]."', '".$_POST["payer_state"]."', '".$_POST["payer_zip"]."', '".$_POST["payer_country"]."', '".$_POST["payer_email"]."', 'pending', NOW())");

        $this_script = 'https://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];

        $data = array(
            'action'            => 'process',
            'cmd'               => '_cart',
            'currency_code'     => $_POST['CUR'],
            'invoice'           => $_POST['id'],
            'product_id'        => 1,
            'product_name'      => 'RAD',
            'product_quantity'  => 1,
            'product_amount'    => $_POST['v'],
            'payer_fname'       => $_POST['f'],
            'payer_lname'       => $_POST['l'],
            'payer_address'     => $_POST['a'],
            'payer_city'        => $_POST['c'],
            'payer_state'       => $_POST['s'],
            'payer_zip'         => $_POST['z'],
            'payer_country'     => $_POST['cn'],
            'email'             => isset($_POST['mail']) ? $_POST['mail'] : ''
        );

        file_put_contents('/tmp/log-'. md5($data['invoice']), json_encode($data));

        $p->add_field('business',       PAYPAL_EMAIL_ADD);
        $p->add_field('cmd',            $data['cmd']);
        $p->add_field('upload',         '1');
        $p->add_field('return',         $this_script.'?action=success');
        $p->add_field('cancel_return',  $this_script.'?action=cancel');
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
        $p->submit_paypaldata();
        $p->dump_fields();
        break;

    case 'success':
        echo '<pre>';var_dump($_POST);echo '</pre>';
        echo '<h1>SUCCESS</h1>';
        echo '<h4>Use this below URL in paypal sandbox IPN Handler URL to complete the transaction</h4>';
        echo '<h3>http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?action=ipn</h3>';
        echo '</div>';
        break;

    case 'cancel': // case cancel to show user the transaction was cancelled
        echo "<h1>Transaction Cancelled";
        break;

    case "ipn": // IPN case to receive payment information. this case will not displayed in browser. This is server to server communication. PayPal will send the transactions each and every details to this case in secured POST menthod by server to server.
        $trasaction_id  = $_POST["txn_id"];
        $payment_status = strtolower($_POST["payment_status"]);
        $invoice        = $_POST['invoice'];
        $file           = '/tmp/log-'. md5($data['invoice']);
        if (!file_exists($file)) {
            mail('geoffrey@raaad.fr', 'Paypal fail', print_r($_POST,1));
        }

        $data = (array) json_decode(file_get_contents($file));
        if ($p->validate_ipn()) {
            $data['success'] = 1;
            file_put_contents($file, json_encode($data));
            $subject = 'Instant Payment Notification - Recieved Payment';
            $p->send_report($subject); // Send the notification about the transaction
        }else{
            $data['success'] = 1;
            file_put_contents($file, json_encode($data));
            $subject = 'Instant Payment Notification - Payment Fail';
            $p->send_report($subject); // failed notification
        }
        break;
}
