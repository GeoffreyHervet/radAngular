"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('uk', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "lang": "English",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (United States of America)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland)",
    "country": "United Kingdom",
    "store.change": "Change store",
    "global.loading": "Loading",
    "404.product": "Product cannot be found",
    "404.category": "Category cannot be found",
    "login.with_facebook": "Connect with Facebook",
    "login.or_register_email": "Connection or sign in via e-mail",
    "form.submit": "Validate",
    "form.connect": "Connect",
    "form.use": "Use",
    "form.edit": "Modify",
    "form.state": "Please choose a state",
    "error.connexion_lost": "Problems with the log in, please try again later.",
    "error.unknown_reason": "Problems with the log in, please try again later.",
    "error.facebook_rejected": "You cannot be identified via Facebook.",
    "error.phone_number": "Incorrect phone number",
    "connexion.form.legend": "Please enter your credentials.",
    "connexion.form.email.placeholder": "E-mail address",
    "connexion.form.password.placeholder": "Password",
    "connexion.form.lost_password": "Password forgotten",
    "connexion.facebook": "Connect with Facebook",
    "register.new_account": "Create account",
    "register.title": "Sign Up",
    "register.facebook": "Sign up with Facebook",
    "register.form.legend": "Please fill out all the subsequent fields.",
    "register.form.firstname.placeholder": "Name",
    "register.form.lastname.placeholder": "Surname",
    "register.form.email.placeholder": "E-mail address",
    "register.form.password.placeholder": "Password",
    "register.form.birthday.placeholder": "31\/12\/2000",
    "register.form.cell.placeholder": "06 06 06 06 06",
    "search.empty": "No item found for this search",
    "lostpass.title": "Help",
    "lostpass.form.legend": "Please enter your e-mail address.",
    "lostpass.form.email.placeholder": "E-mail address.",
    "lostpass.success": "You will shortly receive an e-mail at {{email}} to initialize your password. ",
    "menu.default": "Shop",
    "menu.search": "Search",
    "menu.center_title": "Menu",
    "menu.title": "Menu",
    "menu.cart": "Cart",
    "menu.profile": "Profile",
    "menu.orders": "My orders",
    "menu.payments": "Payment",
    "menu.addresses": "My addresses",
    "menu.free_orders": "Free orders",
    "menu.help": "Help",
    "menu.logout": "Sign out",
    "menu.home": "Shop",
    "menu.login": "Log in",
    "menu.cgv": "Terms",
    "myaccount.myorders.title": "My orders",
    "myaccount.myorders.noorders": "No orders",
    "myaccount.myorders.order_link": "Order #{{id}} from {{date}}",
    "myaccount.order.title": "Order #{{id}} ",
    "myaccount.order.detail": "Details of the order",
    "myaccount.order.subTotal": "Subtotal",
    "myaccount.order.shipPrice": "Shipping costs",
    "myaccount.order.credit": "Credits",
    "myaccount.order.total": "Total",
    "myaccount.order.payment": "Method of payment",
    "myaccount.order.delivery": "Delivery address",
    "myaccount.order.billing": "Billing address",
    "myaccount.profile.title": "My account",
    "myaccount.profile.form_legend": "Personal information",
    "myaccount.profile.free_order.title": "Free orders",
    "myaccount.profile.free_order.headline": "Invite your friends and earn store credit. ",
    "myaccount.profile.free_order.submessage": "Invite 10 friends and get £30 in credits, 25 friends get £50.",
    "myaccount.profile.free_order.sharemsg": "Discover urban fashion on Rad. Invite your friends and get up to $50 to spend {{url}} #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Share via message",
    "myaccount.profile.free_order.share.whatsapp": "Share via WhatsApp",
    "myaccount.profile.free_order.share.facebook": "Share via Facebook",
    "myaccount.profile.free_order.share.twitter": "Share via Twitter",
    "myaccount.profile.free_order.credit_info": "Available credits and spent credits. ",
    "myaccount.profile.free_order.used": "{{amount}} spent",
    "myaccount.profile.free_order.available": "{{amount}} available",
    "myaccount.profile.free_order.invit_info": "Number of sent invitations.",
    "myaccount.profile.free_order.intit_sended": "{{number}} of sent invitations",
    "myaccount.profile.email": "E-mail address",
    "myaccount.profile.email_new": "New e-mail address",
    "myaccount.profile.current_password": "Current password",
    "myaccount.profile.current_email_is": "Your current e-mail address is {{email}}.",
    "myaccount.profile.password_help": "Please enter your new password and afterwards your actual password. ",
    "myaccount.profile.password": "Password",
    "myaccount.profile.password_new": "New password",
    "myaccount.profile.settings": "Settings",
    "myaccount.profile.newsletter": "Newsletter",
    "myaccount.profile.newsletter_help": "I would like to receive the newsletter of Rad.co in order to receive actual informations, novelties and special offers.",
    "myaccount.profile.facebook_link": "Link my facebook account.",
    "myaccount.profile.cards": "Payment",
    "myaccount.profile.no_cards": "You have no registered card.",
    "myaccount.profile.card_info": "Card informations",
    "myaccount.profile.remove_card": "Delete my card",
    "myaccount.profile.addresses": "Addresses",
    "myaccount.profile.addresses_add": "New address",
    "myaccount.profile.addresses_edit": "Address details",
    "myaccount.profile.remove_address": "Delete the address",
    "myaccount.profile.address_edit_save": "Validate the changes",
    "product.description": "Description of the product. ",
    "product.specificities": "Product specifications",
    "product.product": "Product",
    "product.products": "Products",
    "product.quantity": "Quantity",
    "product.size": "Size",
    "product.info": "Product info",
    "product.share": "Share",
    "product.add": "Add to cart",
  "product.more_information": "More info about the product",
    "product.more_products": "View more products of {{brand}}",
    "product.succes_add_cart": "Product added!",
    "cart.product_in_cart": "{{nb}} product in your cart",
    "cart.products_in_cart": "{{nb}} products in your cart",
    "cart.edit_empty": "Article cannot be found",
    "cart.confirm": "Confirmation",
    "cart.order": "Order",
    "cart.reloading": "Update your cart",
    "cart.title": "Cart",
    "cart.valid": "Confirm my cart",
    "cart.empty": "Your cart is empty.",
    "cart.pay": "Place order",
    "cart.success": "Summary",
    "cart.recap.payment": "Payment",
    "cart.recap.shipping": "Delivery address",
    "cart.recap.billing": "Billing address",
    "cart.recap.promo": "Coupon code",
    "cart.recap.promo_placeholder": "Enter coupon code",
    "cart.recap.promo_apply": "Apply coupon code",
    "cart.address.add": "Add an address",
    "cart.details": "Details",
    "cart.total.subtotal": "Subtotal",
    "cart.total.shipping": "Shipping",
    "cart.total.tax": "VAT",
    "cart.total.grand_total": "Total",
    "cart.total.raaad_credit": "Rad credits",
    "cart.total.discount": "Coupon code",
    "cart.delivery.title": "Delivery address",
    "cart.delivery.create_placeholder": "Please enter your delivery address.",
    "cart.delivery.firstname": "Name",
    "cart.delivery.lastname": "Surname",
    "cart.delivery.address": "Address",
    "cart.delivery.address2": "Additional information",
    "cart.delivery.city": "Post Town",
    "cart.delivery.postcode": "Zip\/Postal Code",
    "cart.delivery.tel": "Mobile phone number",
    "cart.delivery.use_for_billing": "Same billing address",
    "cart.billing.title": "billing address",
    "cart.billing.create_placeholder": "Please enter your billing address.",
    "cart.payment.title": "Payment",
    "cart.payment.add": "Add a card",
    "cart.payment.add_placeholder": "Please enter your payment informations.",
    "cart.edit": "Edit",
    "cart.edit_product": "Edit product",
    "cart.remove": "Delete from cart",
    "card.not_found": "Card cannot be found",
    "card.owner": "Name on Card",
    "card.number": "Card Number",
    "card.exp_date": "Expiration Date",
    "card.cvc": "Card Verification Number",
    "card.reusable": "Save card for future purchases",
    "card.error.number": "Incorrect Card Number",
    "card.error.exp": "Incorrect Expiration Date",
    "card.error.cvc": "Incorrect Card Verification Number",
    "TU": "One size",
    "Taille": "Size",
    "CONDITIONS GENERALES DE VENTE": "Terms and conditions"
}
);
  })
;