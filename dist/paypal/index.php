<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Simple PayPal Integration code using PHP by Asif18.com - Ready to use script</title>
<style>
.as_wrapper{
	margin:0 auto;
	width:500px;
	font-family:Arial;
	color:#333;
	font-size:14px;
}
.as_country_container{
	padding:20px;
	border:2px dashed #17A3F7;
	margin-bottom:10px;
}
</style>
</head>

<body>
<div class="as_wrapper">
    <form action="paypal.php?action=process&sandbox=1" method="post"> <?php // remove sandbox=1 for live transactions ?>

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

    <table>
    <tr>
        <td><label>CUR</label></td>
        <td><input type="text" name="CUR" value="EUR" /></td>
    </tr>
    <tr>
        <td><label>ID</label></td>
        <td><input type="text" name="id" value="123214" /></td>
    </tr>
    <tr>
        <td><label>Ammount</label></td>
        <td><input type="text" name="v" value="1337.42" /></td>
    </tr>
    <tr>
        <td><label>Firstname</label></td>
        <td><input type="text" name="f" value="Geoffrey" /></td>
    </tr>
    <tr>
        <td><label>Lastname</label></td>
        <td><input type="text" name="l" value="Hervet" /></td>
    </tr>
    <tr>
        <td><label>Adresse</label></td>
        <td><input type="text" name="a" value="1 rue Claude Guy" /></td>
    </tr>
    <tr>
        <td><label>City</label></td>
        <td><input type="text" name="c" value="Ivry sur Seine" /></td>
    </tr>
    <tr>
        <td><label>State</label></td>
        <td><input type="text" name="s" value="" /></td>
    </tr>
    <tr>
        <td><label>Zip</label></td>
        <td><input type="text" name="z" value="94200" /></td>
    </tr>
    <tr>
        <td><label>Country</label></td>
        <td><input type="text" name="cn" value="FR" /></td>
    </tr>
    <tr>
        <td><label>URL</label></td>
        <td><input type="text" name="url" value="https://m.rad.co/#/cart" /></td>
    </tr>
    <tr>
        <td colspan="2" align="center"><input type="submit" name="submit" value="Submit" /></td>
    </tr>
    </table>
    </form>
</table>
</div>
</body>
</html>s