angular.module('angularApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/account/_order-detail.html',
    "<div class=\"recap-order\" ng-show=\"order\">\n" +
    "  <h3 class=\"first\">{{'product.products'|translate}}</h3>\n" +
    "  <div class=\"products\">\n" +
    "    <div ng-repeat=\"item in items\" class=\"product\" ui-sref=\"^.product({productslug: item._product_id + '-' + item.name})\">\n" +
    "      <div class=\"img\"><img ng-src=\"{{item.icon.__text}}\"/></div>\n" +
    "      <div class=\"spec\">\n" +
    "        <h2>{{item.name}}</h2>\n" +
    "        <div class=\"price\">{{item.price.including_tax._value}}</div>\n" +
    "        <ul class=\"infos list-unstyled\">\n" +
    "          <li>{{'product.quantity'|translate}} {{item.qty.value.__text ? item.qty.value.__text : 1}}</li>\n" +
    "          <li>{{'product.size'|translate}} {{item.options.option.__text}}</li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <form role=\"form\" name=\"connexion_form\">\n" +
    "    <fieldset>\n" +
    "      <legend translate>myaccount.order.payment</legend>\n" +
    "      <span class=\"no-right btn-big-action change-page\"><span translate class=\"address-details\">{{order.payment_method._title}}</span></span>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend translate>myaccount.order.delivery</legend>\n" +
    "      <span class=\"no-right btn-big-action change-page\"><span translate class=\"address-details\">{{formatAddress(order.shipping_address)}}</span></span>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend translate>myaccount.order.billing</legend>\n" +
    "      <span class=\"no-right btn-big-action change-page\"><span translate class=\"address-details\">{{formatAddress(order.billing_address)}}</span></span>\n" +
    "    </fieldset>\n" +
    "  </form>\n" +
    "\n" +
    "  <div ng-init=\"open=true\" ng-class=\"{numbers: true, 'numbers-original':true, open: open}\" ng-click=\"open=!open\">\n" +
    "    <span class=\"detail-toggle\">{{'cart.details'|translate}}</span>\n" +
    "    <ul class=\"list-unstyled\">\n" +
    "      <li ng-repeat=\"total in totals\" ng-class=\"{'text-bold':key === 'grand_total'}\">{{ total.label }} <span ng-class=\"{blue: $last, 'price-content':true}\">{{total.val}}</span></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/address-add.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.addresses_add'|translate}}</legend>\n" +
    "\n" +
    "      <magento-address\n" +
    "        firstname=\"firstname\"\n" +
    "        lastname=\"lastname\"\n" +
    "        street=\"street\"\n" +
    "        street1=\"street1\"\n" +
    "        city=\"city\"\n" +
    "        postcode=\"postcode\"\n" +
    "        telephone=\"telephone\"\n" +
    "        state=\"state\"\n" +
    "        country=\"country\"\n" +
    "        validPhone=\"validPhone\"\n" +
    "        updator=\"validUpdate\"\n" +
    "        ></magento-address>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-address-add'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/address-edit.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.addresses_add'|translate}}</legend>\n" +
    "      <magento-address if=\"0\"\n" +
    "        firstname=\"firstname\"\n" +
    "        lastname=\"lastname\"\n" +
    "        street=\"street\"\n" +
    "        street1=\"street1\"\n" +
    "        city=\"city\"\n" +
    "        postcode=\"postcode\"\n" +
    "        telephone=\"telephone\"\n" +
    "        state=\"state\"\n" +
    "        country=\"country\"\n" +
    "        validPhone=\"validPhone\"\n" +
    "        updator=\"validUpdate\"\n" +
    "        ></magento-address>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'myaccount.profile.address_edit_save'|translate}}\" />\n" +
    "    <a class=\"btn-big-action btn-red\" ng-click=\"deleteAddress()\" href=\"javascript:;\">{{'myaccount.profile.remove_address'|translate}}</a>\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-address-edit'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/addresses.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"address-list\">\n" +
    "    <a ng-repeat=\"address in addresses\" class=\"item\" ui-sref=\"app.my-account.addresses.edit({id: address.entity_id})\">\n" +
    "      <i class=\"picto-marker\"></i>\n" +
    "      <span>{{ address.street1 }}, {{address.city}}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "    <a ui-sref=\"app.my-account.addresses.add\" class=\"item item-add\">\n" +
    "      <i class=\"picto-plus\"></i>\n" +
    "      <span>{{'cart.address.add'|translate}}</span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'account-address-list'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/card-detail.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\" ng-show=\"card\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.card_info'|translate}}</legend>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div ng-class=\"{'input-container': true, 'card-amex': card.type == 'American Express', 'card-visa': card.type == 'Visa', 'card-mastercard': card.type == 'Mastercard'}\">\n" +
    "          <input class=\"form-control\" name=\"ccNumber\" ng-model=\"number\" readonly placeholder=\"{{'card.number'|translate}}\" type=\"text\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container card-month\">\n" +
    "          <input class=\"form-control\" ng-model=\"date\" readonly placeholder=\"{{'card.exp_date'|translate}}\" type=\"text\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <a class=\"btn-big-action btn-red\" ng-click=\"deleteCard()\" href=\"javascript:;\">{{'myaccount.profile.remove_card'|translate}}</a>\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-card-details'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/cards.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"address-list\" ng-show=\"!loading && cards.length\">\n" +
    "    <a ng-repeat=\"card in cards\" class=\"item item-card\" ui-sref=\"app.my-account.cards.show({id: card.id})\">\n" +
    "      <i ng-class=\"{'picto-amex': card.type == 'American Express' || card.type.toLocaleUpperCase().trim() == 'AMERICAN EXPRESS', 'picto-visa': card.type == 'Visa', 'picto-mastercard': card.type == 'American Express'}\"></i>\n" +
    "      <span>{{ format(card) }}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"!cards.length && !loading\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-info fade in\">\n" +
    "      {{'myaccount.profile.no_cards'|translate}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'account-card-list'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/email.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"error\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ error | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\" ng-show=\"success\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-success alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ success | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.current_email_is'|translate:translateData}}</legend>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container input-container-picto\">\n" +
    "          <input type=\"email\" class=\"form-control\" name=\"newaddrem\" ng-model=\"email\" placeholder=\"{{'myaccount.profile.email_new'|translate}}\" />\n" +
    "          <a class=\"picto picto-required\" href=\"javascript:;\" ng-show=\"connexion_form.email.$error.email || !email.length\"></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container input-container-picto\">\n" +
    "          <input type=\"password\" required class=\"form-control\" name=\"password\" ng-model=\"password\" placeholder=\"{{'myaccount.profile.current_password'|translate}}\" />\n" +
    "          <a class=\"picto picto-help\" ui-sref=\"app.auth.lost_password\"></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-edit-email'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/free-orders.html',
    "<menu-top menu-title=\"title\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "<div loader ng-show=\"loading\"></div>\n" +
    "<div class=\"row\" ng-show=\"error\">\n" +
    "  <br />\n" +
    "  <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "    {{ error | translate }}\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"free-order\">\n" +
    "  <form role=\"form\" name=\"connexion_form\" ng-submit=\"false\">\n" +
    "    <h3 translate>myaccount.profile.free_order.headline</h3>\n" +
    "    <h4 translate>myaccount.profile.free_order.submessage</h4>\n" +
    "    <div class=\"share-links\">\n" +
    "      <!--<a class=\"btn-big-action share-sms\"       ng-href=\"{{share.sms}}\"   translate>myaccount.profile.free_order.share.sms</a>-->\n" +
    "      <a class=\"btn-big-action share-whatsapp\"  ng-href=\"{{share.whatsapp}}\" translate>myaccount.profile.free_order.share.whatsapp</a>\n" +
    "      <a class=\"btn-big-action share-facebook\"  ng-href=\"{{share.facebook}}\" translate target=\"_blank\">myaccount.profile.free_order.share.facebook</a>\n" +
    "      <a class=\"btn-big-action share-twitter\"   ng-href=\"{{share.twitter}}\" translate>myaccount.profile.free_order.share.twitter</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <br /><br />\n" +
    "\n" +
    "    <fieldset>\n" +
    "      <legend translate>myaccount.profile.free_order.credit_info</legend>\n" +
    "      <div class=\"btn-big-action btn-big-action-light\">\n" +
    "        {{'myaccount.profile.free_order.available'|translate:'{\"amount\":\"' + user.referafriend.credit_amount +'\"}'}}\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <br /><br />\n" +
    "  </form>\n" +
    "</div>\n" +
    "<tracking data=\"{type:'account-free-orders'}\" type=\"all\"></tracking>\n"
  );


  $templateCache.put('views/account/my-orders.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"no_orders && !error\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-info alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ 'myaccount.myorders.noorders' | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"btn-list-link\">\n" +
    "    <a\n" +
    "      ng-repeat=\"order in orders\"\n" +
    "      ui-sref=\"app.my-account.orders.show({num: order.number, id: order.entity_id})\"\n" +
    "      translate=\"myaccount.myorders.order_link\"\n" +
    "      translate-values=\"{id: '{{order.number}}', date: '{{order.date}}'}\"\n" +
    "      ></a>\n" +
    "  </div>\n" +
    "  <tracking ng-if=\"!success && !loading\" data=\"{type:'account-order-list', id: ids}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/order-recap.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div ng-if=\"success\">\n" +
    "    <div class=\"alert-info alert\">\n" +
    "      <h3 class=\"text-center\" translate>success.thankyou</h3>\n" +
    "      <br />\n" +
    "      <p translate>success.text</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-include=\"'views/account/_order-detail.html'\"></div>\n" +
    "  <tracking ng-if=\"success && !loading\"  data=\"{type:'checkout-success',     order: order, id: ids, items: items}\" type=\"all\"></tracking>\n" +
    "  <tracking ng-if=\"!success && !loading\" data=\"{type:'account-order-detail', order: order, id: ids, items: items}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/password.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"error\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ error | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\" ng-show=\"success\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-success alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ success | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.password_help'|translate}}</legend>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"password\" required class=\"form-control\" name=\"new\" ng-model=\"password\" placeholder=\"{{'myaccount.profile.password_new'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"password\" required class=\"form-control\" name=\"current\" ng-model=\"current\" placeholder=\"{{'myaccount.profile.current_password'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-edit-password'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/account/profile.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"success\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-success alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ success | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.form_legend'|translate}}</legend>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" name=\"firstname\" ng-model=\"user.firstname\" required />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" name=\"lastname\" ng-model=\"user.lastname\" required />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.email'|translate}}</legend>\n" +
    "      <a class=\"btn-big-action change-page\" ui-sref=\"app.my-account.email\"><span>{{user.email}}</span></a>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.password'|translate}}</legend>\n" +
    "      <a class=\"btn-big-action change-page\" ui-sref=\"app.my-account.password\"><span>••••••••••••</span></a>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend>{{'myaccount.profile.settings'|translate}}</legend>\n" +
    "      <div class=\"form-group switch-btn border-bottom\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <span ng-click=\"user.newsletter=!user.newsletter\">{{'myaccount.profile.newsletter'|translate}}</span>\n" +
    "          <switch name=\"use_for_billing\" ng-model=\"user.newsletter\" class=\"green\"></switch>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"help-block\">{{'myaccount.profile.newsletter_help'|translate}}</div>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "    <a ui-sref=\"app.page({slug: cgvSlug})\" class=\"btn-big-action\" translate>menu.cgv</a>\n" +
    "    <a class=\"btn-big-action btn-red\" ui-sref=\"app.auth.logout\">{{'menu.logout'|translate}}</a>\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'account-edit-profile'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/auth/connexion.html',
    "<menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/\" error=\"error\"></menu-top>\n" +
    "<div loader ng-show=\"loading\"></div>\n" +
    "<form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\">\n" +
    "  <fieldset>\n" +
    "    <legend>{{'connexion.form.legend'|translate}}</legend>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-container\">\n" +
    "        <input type=\"email\" class=\"form-control\" name=\"email\" ng-model=\"email\" placeholder=\"{{'connexion.form.email.placeholder'|translate}}\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group border-bottom\">\n" +
    "      <div class=\"input-container\">\n" +
    "        <input type=\"password\" class=\"form-control\" name=\"password\" ng-model=\"password\" placeholder=\"{{'connexion.form.password.placeholder'|translate}}\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <p class=\"lost-password\">\n" +
    "      <a ui-sref=\"app.auth.lost_password\">{{'connexion.form.lost_password'|translate}}</a>\n" +
    "    </p>\n" +
    "  </fieldset>\n" +
    "  <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  <div class=\"form-sepa\"></div>\n" +
    "  <a class=\"btn-big-action facebook-connect\" ng-click=\"facebookAuth()\"><span>{{'connexion.facebook'|translate}}</span></a>\n" +
    "  <a class=\"btn-big-action new-account\" ui-sref=\"app.auth.register\">{{'register.new_account'|translate}}</a>\n" +
    "</form>\n" +
    "<tracking data=\"{type:'auth-connexion'}\" type=\"all\"></tracking>\n"
  );


  $templateCache.put('views/auth/login.html',
    "<div>\n" +
    "  <div class=\"login-page\">\n" +
    "    <div class=\"content\">\n" +
    "      <a href=\"\" class=\"login-facebook\">{{'login.with_facebook'|translate}}</a>\n" +
    "      <a ui-sref=\"app.auth\" class=\"login-normal\">{{'login.or_register_email'|translate}}</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'auth-login'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/auth/logout.html',
    "<div>\n" +
    "  <div class=\"splashscreen\">\n" +
    "    <div class=\"content\">\n" +
    "      <img src=\"images/splashscreen-text.png\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'auth-logout'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/auth/lost-password.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/connexion\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"success-message-white\" ng-if=\"success\">\n" +
    "    <span>{{ success|translate:translateData  }}</span>\n" +
    "  </div>\n" +
    "  <form role=\"form\" name=\"lostpass_form\" novalidate ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'lostpass.form.legend'|translate}}</legend>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container input-container-picto\">\n" +
    "          <input type=\"email\" class=\"form-control\" name=\"email\" ng-model=\"email\" placeholder=\"{{'lostpass.form.email.placeholder'|translate}}\" />\n" +
    "          <a class=\"picto picto-required\" href=\"javascript:;\" ng-show=\"lostpass_form.email.$error.email || !email.length\"></a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'auth-lostpassword'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/auth/register.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/connexion\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'connexion.form.legend'|translate}}</legend>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" name=\"firstname\" ng-model=\"firstname\" placeholder=\"{{'register.form.firstname.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" name=\"lastname\" ng-model=\"lastname\" placeholder=\"{{'register.form.lastname.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"email\" class=\"form-control\" name=\"email\" ng-model=\"email\" placeholder=\"{{'register.form.email.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"password\" class=\"form-control\" name=\"password\" ng-model=\"password\" placeholder=\"{{'register.form.password.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" ng-if=\"0\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" name=\"birthday\" ng-model=\"birthday\" placeholder=\"{{'register.form.birthday.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" ng-if=\"0\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"tel\" class=\"form-control\" name=\"cell\" ng-model=\"cell\" placeholder=\"{{'register.form.cell.placeholder'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input type=\"submit\" class=\"btn-big-action\" value=\"{{'form.submit'|translate}}\" />\n" +
    "    <a class=\"btn-big-action facebook-connect\" ng-click=\"facebookAuth()\"><span>{{'register.facebook'|translate}}</span></a>\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'auth-register'}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/billing-address-create.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/delivery-address-list\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'cart.billing.create_placeholder'|translate}}</legend>\n" +
    "\n" +
    "      <magento-address\n" +
    "        firstname=\"firstname\"\n" +
    "        lastname=\"lastname\"\n" +
    "        street=\"street\"\n" +
    "        street1=\"street1\"\n" +
    "        city=\"city\"\n" +
    "        postcode=\"postcode\"\n" +
    "        telephone=\"telephone\"\n" +
    "        state=\"state\"\n" +
    "        country=\"country\"\n" +
    "        validPhone=\"validPhone\"\n" +
    "        updator=\"validUpdate\"\n" +
    "        ></magento-address>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'cart-billing-address-create', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/billing-address-list.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/delivery-address-list\"></menu-top>\n" +
    "  <div loader ng-show=\"masterLoading || loading\"></div>\n" +
    "  <div class=\"address-list\">\n" +
    "    <!--<div class=\"item-wrapper-loader\" ng-show=\"loading\"><div class=\"loader\"></div></div>-->\n" +
    "    <a ng-repeat=\"address in addresses\" class=\"item\" href=\"javascript:;\" ng-click=\"useAddress(address)\">\n" +
    "      <i class=\"picto-marker\"></i>\n" +
    "      <span>{{ address.street1 }}, {{address.postcode}}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "    <a ui-sref=\"app.cart.billing.new\" class=\"item item-add\">\n" +
    "      <i class=\"picto-plus\"></i>\n" +
    "      <span>{{'cart.address.add'|translate}}</span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'cart-billing-address-list', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/confirm.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/payment\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "\n" +
    "  <div ng-show=\"details.empty && !(loading && details != null)\" class=\"clearfix\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-warning alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ 'cart.empty' | translate }}\n" +
    "    </div>\n" +
    "    <br />\n" +
    "  </div>\n" +
    "  <div class=\"recap-order\" ng-hide=\"(details.empty && !(loading && details != null)) || (details.empty && loading)\">\n" +
    "    <div class=\"products\">\n" +
    "      <div ng-repeat=\"item in details.items\" class=\"product\" ui-sref=\"app.cart.edit({itemId: item.item_id})\">\n" +
    "        <div class=\"img\"><img ng-src=\"{{item.icon.__text}}\" /></div>\n" +
    "        <div class=\"spec\">\n" +
    "          <a class=\"edit-product\" ui-sref=\"app.cart.edit({itemId: item.item_id})\">{{ 'cart.edit' | translate }}</a>\n" +
    "          <h2 class=\"cart-page\">{{item.name}}</h2>\n" +
    "          <div class=\"price\">\n" +
    "            <span ng-class=\"(item.formated_price._special ? 'old-price' : '')\">{{ item.formated_price._regular }}</span>\n" +
    "            <span ng-if=\"item.formated_price._special\" class=\"new-price\">{{ item.formated_price._special }}</span>\n" +
    "          </div>\n" +
    "          <ul class=\"infos list-unstyled\">\n" +
    "            <li ng-repeat=\"opt in item.options.option\">{{opt._label|translate}} : {{opt._text|translate}}</li>\n" +
    "            <li>{{'product.quantity'|translate}} : {{item.qty}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <form role=\"form\" name=\"connexion_form\" ng-submit=\"submitForm()\" class=\"ng-pristine ng-scope ng-valid ng-valid-required\" style=\"\">\n" +
    "      <fieldset>\n" +
    "        <legend>{{'cart.recap.payment'|translate}}</legend>\n" +
    "        <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.payment\">\n" +
    "        <span ng-if=\"payData.card.new\">\n" +
    "          <i ng-class=\"{'card-ico': true, 'card-amex': payData.card.type == 'amex', 'card-visa': payData.card.type == 'visa', 'card-mastercard': payData.card.type == 'mastercard'}\"></i>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'amex'\">AMEX ({{payData.card.num}})</span>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'visa'\">VISA ({{payData.card.num}})</span>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'mastercard'\">MASTERCARD ({{payData.card.num}})</span>\n" +
    "        </span>\n" +
    "        <span ng-if=\"payData && !payData.card.new\">\n" +
    "          <i ng-class=\"{'card-ico': true, 'card-amex': payData.card.type == 'American Express', 'card-visa': payData.card.type == 'Visa', 'card-mastercard': payData.card.type == 'MasterCard'}\"></i>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'American Express'\">AMEX ({{payData.card.number.slice(-4)}})</span>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'Visa'\">VISA ({{payData.card.number.slice(-4)}})</span>\n" +
    "          <span class=\"txt\" ng-if=\"payData.card.type == 'MasterCard'\">MASTERCARD ({{payData.card.number.slice(-4)}})</span>\n" +
    "        </span>\n" +
    "        <span ng-if=\"!payData\"><i class=\"card-ico card-mastercard\"></i><span class=\"txt\" translate>cart.add_card</span></span>\n" +
    "        </a>\n" +
    "      </fieldset>\n" +
    "      <fieldset ng-if=\"fullDetails.addresses.shipping_address\">\n" +
    "        <legend>{{'cart.recap.shipping'|translate}}</legend>\n" +
    "        <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.delivery\"><span translate class=\"address-details\">{{formatAddress(fullDetails.addresses.shipping_address)}}</span></a>\n" +
    "      </fieldset>\n" +
    "      <fieldset ng-if=\"fullDetails.addresses.billing_address\">\n" +
    "        <legend>{{'cart.recap.billing'|translate}}</legend>\n" +
    "        <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.billing\"><span translate class=\"address-details\">{{formatAddress(fullDetails.addresses.billing_address)}}</span></a>\n" +
    "      </fieldset>\n" +
    "      <br />\n" +
    "      <fieldset>\n" +
    "        <legend>{{'cart.recap.promo'|translate}}</legend>\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-container\">\n" +
    "            <input type=\"text\" class=\"form-control\" name=\"promo\" ng-model=\"promo\" required>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </fieldset>\n" +
    "      <input type=\"submit\" class=\"btn-big-action cart-promo-submit\" value=\"{{'cart.recap.promo_apply'|translate}}\" ng-show=\"promo && promo != promoapplied\">\n" +
    "    </form>\n" +
    "    <br /><br /><br />\n" +
    "    <br /><br /><br />\n" +
    "    <div ng-init=\"open=false\" ng-class=\"{numbers: true, open: open}\" ng-click=\"open=!open\">\n" +
    "      <span class=\"detail-toggle\">{{'cart.details'|translate}}</span>\n" +
    "      <ul class=\"list-unstyled\">\n" +
    "        <li ng-repeat=\"(key,total) in details.totals\" ng-class=\"{'text-bold':key === 'grand_total'}\">{{('cart.total.' + key) | translate}} <span ng-class=\"{blue: key== 'grand_total', 'price-content':true}\">{{total.formated_value}}</span></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <a class=\"valid-cart-btn\" href=\"javascript:;\" ng-click=\"pay()\">{{'cart.pay'|translate}}</a>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'cart-confirmation', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/delivery-address-create.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/billing-address-list\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'cart.delivery.create_placeholder'|translate}}</legend>\n" +
    "\n" +
    "      <magento-address\n" +
    "        firstname=\"firstname\"\n" +
    "        lastname=\"lastname\"\n" +
    "        street=\"street\"\n" +
    "        street1=\"street1\"\n" +
    "        city=\"city\"\n" +
    "        postcode=\"postcode\"\n" +
    "        telephone=\"telephone\"\n" +
    "        state=\"state\"\n" +
    "        country=\"country\"\n" +
    "        validPhone=\"validPhone\"\n" +
    "        updator=\"validUpdate\"\n" +
    "        ></magento-address>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend>&nbsp;</legend>\n" +
    "      <div class=\"form-group switch-btn\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <span ng-click=\"use_for_billing=!use_for_billing\">{{'cart.delivery.use_for_billing'|translate}}</span>\n" +
    "          <switch name=\"use_for_billing\" ng-model=\"use_for_billing\" class=\"green\"></switch>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "\n" +
    "    <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'form.submit'|translate}}\" />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'cart-delivery-address-create', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/delivery-address-list.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart\"></menu-top>\n" +
    "  <div loader ng-show=\"masterLoading || loading\"></div>\n" +
    "  <div class=\"address-list\">\n" +
    "    <!--<div class=\"item-wrapper-loader\" ng-show=\"loading\"><div class=\"loader\"></div></div>-->\n" +
    "    <a ng-repeat=\"address in addresses\" class=\"item\" href=\"javascript:;\" ng-click=\"useAddress(address)\">\n" +
    "      <i class=\"picto-marker\"></i>\n" +
    "      <span>{{ address.street1 }}, {{address.city}}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "    <a ui-sref=\"app.cart.delivery.new\" class=\"item item-add\">\n" +
    "      <i class=\"picto-plus\"></i>\n" +
    "      <span>{{'cart.address.add'|translate}}</span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'cart-delivery-address-list', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/edit.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"page-product\">\n" +
    "    <form role=\"form\" class=\"product-form\" ng-submit=\"submitForm()\">\n" +
    "    <div class=\"page-product\" ng-if=\"product\">\n" +
    "      <div id=\"product-carousel\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
    "        <div class=\"carousel-demo\">\n" +
    "          <ul rn-carousel rn-carousel-index=\"carouselIndex\" rn-carousel-buffered rn-carousel-auto-slide >\n" +
    "            <li ng-repeat=\"image in images track by $index\" ng-class=\"{'item':true, 'active': $index==0}\">\n" +
    "              <img ng-src=\"{{image}}\" rad-rn-fix/>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <div ng-if=\"images.length > 1\" rn-carousel-indicators slides=\"images\" rn-carousel-index=\"carouselIndex\" class=\"text-center\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h2 class=\"clearfix\">\n" +
    "        <span class=\"title\"><span>{{product.name}}</span></span>\n" +
    "      </h2>\n" +
    "      <div ng-repeat=\"option in options\" class=\"option-chooses\">\n" +
    "        <span class=\"pull-left\">{{option._label}}</span>\n" +
    "        <span class=\"pull-right text-right\">\n" +
    "          <span ng-repeat=\"val in option.value\" ng-class=\"{item: true, 'item-opt':true, active: val.active == true}\" ng-click=\"changeOption(option.value, val)\">\n" +
    "            {{ val._label | translate }}\n" +
    "          </span>\n" +
    "        </span>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "      </div>\n" +
    "      <div class=\"option-chooses\">\n" +
    "        <span class=\"pull-left\">{{'product.quantity'|translate }}</span>\n" +
    "        <span class=\"pull-right\">\n" +
    "          <span ng-click=\"delQty()\" class=\"item minus\"></span>\n" +
    "          <input class=\"qty\" readonly ng-model=\"item.qty\" />\n" +
    "          <span ng-click=\"addQty()\" class=\"item plus\"></span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'form.submit'|translate}}\" />\n" +
    "      <a class=\"btn-big-action btn-red\" href=\"javascript:;\" ng-click=\"removeItem()\">{{'cart.remove'|translate}}</a>\n" +
    "    </form>\n" +
    "    <br /><br /><br />\n" +
    "  </div>\n" +
    "  <tracking ng-if=\"product\" data=\"{type:'cart-product-edit', id: product.entity_id}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/payment-add.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/billing-address-list\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"alert alert-info\" style=\"margin-bottom: 0;\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <span aria-hidden=\"true\">&times;</span>\n" +
    "    </button>\n" +
    "    <p ng-if=\"payDataPresent\" translate>card.pay_data_present</p>\n" +
    "    <p translate>card.pretext</p>\n" +
    "  </div>\n" +
    "  <form role=\"form\" name=\"form_address\" ng-submit=\"submitForm()\">\n" +
    "    <fieldset>\n" +
    "      <legend>{{'cart.payment.add_placeholder'|translate}}</legend>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"text\" class=\"form-control\" required=\"required\" name=\"owner\" ng-model=\"owner\" placeholder=\"{{'card.owner'|translate}}\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div ng-class=\"{'input-container': true, 'card-amex': cardType == 'amex', 'card-visa': cardType == 'visa', 'card-mastercard': cardType == 'mastercard'}\">\n" +
    "          <!--<card-number-input class=\"form-control\" name=\"ccNumber\" ng-model=\"cardNumber\" card-type=\"cardType\" placeholder=\"{{'card.number'|translate}}\"></card-number-input>-->\n" +
    "          <input class=\"form-control\" name=\"ccNumber\" ng-model=\"cardNumber\" card-type=\"cardType\" placeholder=\"{{'card.number'|translate}}\" x-autocompletetype=\"cc-number\" restrict-numeric card-number-validator card-number-formatter type=\"tel\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container card-month\">\n" +
    "          <input class=\"form-control cc-exp\" x-autocompletetype=\"cc-exp\" maxlength=\"9\" restrict-numeric card-expiry-validator card-expiry-formatter type=\"tel\" name=\"ccExpiry\" ng-model=\"cardExpiry\" placeholder=\"{{'card.exp_date'|translate}}\" />\n" +
    "          <!--<card-expiry-input class=\"form-control\" name=\"ccExpiry\" ng-model=\"cardExpiry\" placeholder=\"{{'card.exp_date'|translate}}\"></card-expiry-input>-->\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <!--<card-cvc-input class=\"form-control\" name=\"ccCvc\" ng-model=\"cardCvc\" placeholder=\"{{'card.cvc'|translate}}\"></card-cvc-input>-->\n" +
    "          <input class=\"form-control\" name=\"ccCvc\" ng-model=\"cardCvc\" placeholder=\"{{'card.cvc'|translate}}\" type=\"tel\" x-autocompletetype=\"cc-csc\" restrict-numeric card-cvc-validator card-cvc-formatter ng-maxlength=\"4\" ng-pattern=\"/\\d*/\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <fieldset>\n" +
    "      <legend>&nbsp;</legend>\n" +
    "      <div class=\"form-group switch-btn\">\n" +
    "        <div class=\"input-container\">\n" +
    "          <span ng-click=\"save_my_card=!save_my_card\">{{'card.reusable'|translate}}</span>\n" +
    "          <switch name=\"save_my_card\" ng-model=\"save_my_card\" class=\"green\"></switch>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </fieldset>\n" +
    "    <input class=\"btn-big-action submit\" type=\"submit\" value=\"{{'form.card.save'|translate}}\" />\n" +
    "    <br />\n" +
    "  </form>\n" +
    "  <tracking data=\"{type:'cart-payment-add', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/cart/payment-list.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"/cart/billing-address-list\" error=\"error\"></menu-top>\n" +
    "  <div loader ng-show=\"masterLoading || loading\"></div>\n" +
    "  <div class=\"address-list\">\n" +
    "    <!--<div class=\"item-wrapper-loader\" ng-show=\"loading\"><div class=\"loader\"></div></div>-->\n" +
    "    <a ng-repeat=\"card in payments\" class=\"item item-card\" href=\"javascript:;\" ng-click=\"usePayment(card)\">\n" +
    "      <i ng-class=\"{'picto-amex': card.type == 'American Express' || card.type.toLocaleUpperCase().trim() == 'AMERICAN EXPRESS', 'picto-visa': card.type == 'Visa', 'picto-mastercard': card.type == 'MasterCard'}\"></i>\n" +
    "      <span>{{ format(card) }}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "    <a ui-sref=\"app.cart.payment.add\" class=\"item item-add\">\n" +
    "      <i class=\"picto-plus\"></i>\n" +
    "      <span>{{'cart.payment.add'|translate}}</span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <tracking data=\"{type:'cart-payment-list', id: -1}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/cart-footer.html',
    "<div class=\"cart-footer\" ng-show=\"nb_product > 0\" ng-id=\"nb_product\" ui-sref=\"app.cart\">\n" +
    "  <span class=\"text-left\" ng-if=\"nb_product < 2\">{{'cart.product_in_cart' |translate:'{nb:'+nb_product +'}'}}</span>\n" +
    "  <span class=\"text-left\" ng-if=\"nb_product >= 2\">{{'cart.products_in_cart'|translate:'{nb:'+nb_product +'}'}}</span>\n" +
    "  <a ui-sref=\"app.cart\" class=\"text-right\">\n" +
    "    {{'cart.order' | translate }}\n" +
    "  </a>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/magento-address.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" required=\"required\" name=\"firstname\" ng-model=\"firstname\" placeholder=\"{{'cart.delivery.firstname'|translate}}\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" required=\"required\" name=\"lastname\" ng-model=\"lastname\" placeholder=\"{{'cart.delivery.lastname'|translate}}\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-if=\"countries && countries.length > 1\" class=\"form-group\">\n" +
    "  <div class=\"input-container input-select-container\">\n" +
    "    <select class=\"form-control\" required=\"required\" name=\"cn\" ng-model=\"country\" ng-options=\"cntry.__text for cntry in countries track by cntry._code\" ng-change=\"updateCountry(this.country)\"></select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" required=\"required\" name=\"street\" placeholder=\"{{'cart.delivery.address'|translate}}\" ng-autocomplete ng-model=\"street\" details=\"detailsAutocomplete\" options=\"optionsAutocomplete\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" name=\"street1\" ng-model=\"street1\" placeholder=\"{{'cart.delivery.address2'|translate}}\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" required=\"required\" name=\"postcode\" ng-model=\"postcode\" placeholder=\"{{'cart.delivery.postcode'|translate}}\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"text\" class=\"form-control\" required=\"required\" name=\"city\" ng-model=\"city\" placeholder=\"{{'cart.delivery.city'|translate}}\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-if=\"states && states.length\" class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <select class=\"form-control\" required=\"required\" name=\"st\" id=\"state-list\" ng-model=\"state\" ng-options=\"st.__text for st in states track by st._code\" ng-change=\"updateState(this.state)\">\n" +
    "      <option value=\"\">-- {{'form.state'|translate}} --</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <div class=\"input-container\">\n" +
    "    <input type=\"tel\" updator=\"updator\" phone-number=\"validPhone\" required class=\"form-control\" name=\"telephone\" ng-model=\"telephone\" placeholder=\"{{'cart.delivery.tel'|translate}}\" country=\"countryCode\"/>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/menuleftbtn.html',
    "<a href=\"#\" class=\"left-menu-opener\"></a>\n" +
    "<div class=\"menu-left\">\n" +
    "  <ul>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left class=\"home-page-btn\"><a ui-sref=\"app.store\"></a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left class=\"home\"><a ui-sref=\"app.store\">{{'menu.home'|translate}}</a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left class=\"cart\"><a ui-sref=\"app.cart\">{{'menu.cart'|translate}} <span class=\"pull-right\">{{nbProduct}}</span></a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left ng-hide=\"User.isLoggued()\" class=\"profile\"><a     ui-sref=\"app.auth\">{{'menu.login'|translate}}</a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left ng-show=\"User.isLoggued()\" class=\"profile\"><a     ui-sref=\"app.my-account\">{{'menu.profile'|translate}}</a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left ng-show=\"User.isLoggued()\" class=\"orders\"><a      ui-sref=\"app.my-account.orders\">{{'menu.orders'|translate}}</a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left ng-show=\"User.isLoggued()\" class=\"payments\"><a    ui-sref=\"app.my-account.cards\">{{'menu.payments'|translate}}</a></li>\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left ng-show=\"User.isLoggued()\" class=\"addresses\"><a   ui-sref=\"app.my-account.addresses\">{{'menu.addresses'|translate}}</a></li>\n" +
    "    <!--<li ui-sref-active=\"active\" data-close-menu-left ng-show=\"User.isLoggued()\" class=\"free-orders\"><a ui-sref=\"app.my-account.free-orders\">{{'menu.free_orders'|translate}}</a></li>-->\n" +
    "    <li ui-sref-active=\"active\" data-close-menu-left class=\"help\"><a ui-sref=\"app.page({slug: 'faq'})\">{{'menu.help'|translate}}</a></li>\n" +
    "\n" +
    "    <li data-close-menu-left ng-class=\"['country-change', Lang.get()]\"><a data-target=\"#langModal\" data-toggle=\"modal\">{{'country'|translate }} <span class=\"change-country\" translate>country.change</span></a></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal fade\" id=\"langModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"langModalLabel\">\n" +
    "  <div class=\"modal-dialog\" role=\"document\">\n" +
    "    <div class=\"modal-content modal-gray\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <h4 class=\"modal-title\" id=\"langModalLabel\">{{'store.change'|translate}} - {{'lang'|translate}} <small>({{'country'|translate}})</small></h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body no-padding\">\n" +
    "        <a class=\"btn-big-action lang-switch\" ui-sref=\"app.store({store: 'fr'})\"><i class=\"lang-fr\"></i><span translate>lang.fr</span></a>\n" +
    "        <a class=\"btn-big-action lang-switch\" ui-sref=\"app.store({store: 'us'})\"><i class=\"lang-us\"></i><span translate>lang.us</span></a>\n" +
    "        <a class=\"btn-big-action lang-switch\" ui-sref=\"app.store({store: 'uk'})\"><i class=\"lang-uk\"></i><span translate>lang.uk</span></a>\n" +
    "        <a class=\"btn-big-action lang-switch\" ui-sref=\"app.store({store: 'de'})\"><i class=\"lang-de\"></i><span translate>lang.de</span></a>\n" +
    "        <br />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/directives/menutop.html',
    "<div class=\"menu-top\" ng-if=\"!backEnabled\" ng-init=\"menuOpen = false\">\n" +
    "  <span ng-if=\"product\" class=\"back-btn back-btn-product\" ng-click=\"goBack(-1)\"></span>\n" +
    "  <div class=\"pull-left\">\n" +
    "    <menu-left-btn ng-if=\"!product\"></menu-left-btn>\n" +
    "  </div>\n" +
    "  <div class=\"pull-right\">\n" +
    "    <search-btn ng-if=\"!product\"></search-btn>\n" +
    "    <cart-btn ng-if=\"product\"></cart-btn>\n" +
    "  </div>\n" +
    "  <span ng-if=\"menuTitle\" ng-click=\"toggleMenuState()\">{{menuTitle|translate}}</span>\n" +
    "  <span ng-if=\"!menuTitle\" class=\"text-uppercase\" ng-click=\"toggleMenuState()\"><span class=\"ico-down\"></span> {{'menu.default'|translate}}</span>\n" +
    "</div>\n" +
    "<div ng-if=\"backEnabled\" class=\"menu-top menu-blue\">\n" +
    "  <span class=\"back-btn\" ng-click=\"goBack()\"></span>\n" +
    "  <span ng-if=\"menuTitle\">{{menuTitle|translate}}</span>\n" +
    "  <span ng-if=\"!menuTitle\" class=\"text-uppercase\"><span class=\"ico-down\"></span> {{'menu.default'|translate}}</span>\n" +
    "</div>\n" +
    "<div class=\"menu-drop\" id=\"menu-dropdown\">\n" +
    "  <!--<div><a class=\"child new\" ui-sref=\"app.store.category({categoryslug: newCategoryId + '-' + 'new'})\" translate>menu.new</a></div>-->\n" +
    "  <div ng-repeat=\"(id,category) in categories\" ng-class=\"{'item-close':!category.open===true, 'item-open':category.open===true}\">\n" +
    "    <div ng-if=\"!Utils.isEmpty(category.c)\" class=\"title\" ng-click=\"category.open = category.open === true ? false : true\">{{category.n}} </div>\n" +
    "    <a ng-click=\"enableScroll()\" ng-if=\"Utils.isEmpty(category.c)\" class=\"title\" ui-sref=\"app.store.category({categoryslug: getCategoryId(id) + '-' + Utils.slugify(category.n)})\">{{category.n}} </a>\n" +
    "    <a ng-click=\"enableScroll()\" ng-repeat=\"(id,name) in category.c\" class=\"child\" ui-sref=\"app.store.category({categoryslug: getCategoryId(id) + '-' + Utils.slugify(name)})\">{{name}}</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div ng-if=\"banner.text && !backEnabled\" class=\"master-banner\" style=\"{{banner.style}}\">{{banner.text}}</div>\n" +
    "<div ng-if=\"error\" class=\"master-error\">{{error|translate}}</div>\n" +
    "<div ng-if=\"info\" class=\"master-info\">{{info|translate}}</div>\n" +
    "<smart-banner ng-if=\"android_enabled\"></smart-banner>\n" +
    "<cart-footer ng-if=\"!disabledCartFooter\"></cart-footer>\n"
  );


  $templateCache.put('views/directives/search-btn.html',
    "<a class=\"right-menu-opener\" href=\"#search-form\"></a>\n" +
    "<form id=\"search-form\" ng-submit=\"goToSearch()\" role=\"form\" class=\"search-form\">\n" +
    "  <input type=\"submit\" value=\"\">\n" +
    "  <div class=\"input-wrapper\">\n" +
    "    <input type=\"text\" name=\"q\" ng-model=\"searchValue\" placeholder=\"{{'menu.search'|translate}}\"/>\n" +
    "  </div>\n" +
    "  <span class=\"close-btn\"></span>\n" +
    "</form>\n"
  );


  $templateCache.put('views/pages/cms.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"error\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ error | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-bind-html=\"content\" class=\"cms-page\" cms-page=\"content\"></div>\n" +
    "  <tracking data=\"{type:'cms-' + slug}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/pages/help.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "<div loader ng-show=\"loading\"></div>\n" +
    "<div class=\"row\" ng-show=\"error\">\n" +
    "  <br />\n" +
    "  <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "    {{ error | translate }}\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/store/cart.html',
    "<div>\n" +
    "  <menu-top menu-title=\"title\" disabled-cart-footer=\"1\" info=\"info\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div ng-show=\"details.empty && !(loading && details != null)\" class=\"clearfix\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-warning alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ 'cart.empty' | translate }}\n" +
    "    </div>\n" +
    "    <br />\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"recap-order\" ng-hide=\"details.empty\">\n" +
    "    <div class=\"products\">\n" +
    "      <div ng-repeat=\"item in details.items\" class=\"product\" ui-sref=\"app.cart.edit({itemId: item.item_id})\">\n" +
    "        <div class=\"img\"><img ng-src=\"{{item.icon.__text}}\" /></div>\n" +
    "        <div class=\"spec\">\n" +
    "          <a class=\"edit-product\" ui-sref=\"app.cart.edit({itemId: item.item_id})\">{{ 'cart.edit' | translate }}</a>\n" +
    "          <h2 class=\"cart-page\">{{item.name}}</h2>\n" +
    "          <div class=\"price\">\n" +
    "            <span ng-class=\"(item.formated_price._special ? 'old-price' : '')\">{{ item.formated_price._regular }}</span>\n" +
    "            <span ng-if=\"item.formated_price._special\" class=\"new-price\">{{ item.formated_price._special }}</span>\n" +
    "          </div>\n" +
    "          <ul class=\"infos list-unstyled\">\n" +
    "            <li ng-repeat=\"opt in item.options.option\">{{opt._label|translate}} : {{opt._text|translate}}</li>\n" +
    "            <li>{{'product.quantity'|translate}} : {{item.qty}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div ng-init=\"open=false\" ng-class=\"{numbers: true, open: open}\" ng-click=\"open=!open\">\n" +
    "      <span class=\"detail-toggle\">{{'cart.details'|translate}}</span>\n" +
    "      <ul class=\"list-unstyled\">\n" +
    "        <li ng-repeat=\"(key,total) in details.totals\" ng-class=\"{'text-bold':key === 'grand_total'}\">{{('cart.total.' + key) | translate}} <span ng-class=\"{blue: key== 'grand_total'}\">{{total.formated_value}}</span></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <a class=\"valid-cart-btn\" ui-sref=\"app.cart.delivery\">{{'cart.valid'|translate}}</a>\n" +
    "  </div>\n" +
    "  <tracking ng-if=\"!details.empty && !info\" data=\"{type:'cart', id: ids, items: details.items}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/store/category.html',
    "<div ui-view>\n" +
    "  <menu-top ng-if=\"fromSearch\" menu-title=\"title\" disabled-cart-footer=\"1\" back-enabled=\"-1\" error=\"error\"></menu-top>\n" +
    "  <menu-top ng-if=\"!fromSearch\" menu-title=\"title\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"row\" ng-show=\"error\">\n" +
    "    <br />\n" +
    "    <div class=\"col-xs-10 col-xs-offset-1 alert alert-danger alert-dismissible fade in\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\n" +
    "      {{ '404.category' | translate }}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-hide=\"loading\" ng-if=\"fromSearch && !products.length\">\n" +
    "    <br /><br /><br />\n" +
    "    <p class=\"text-center\" translate>search.empty</p>\n" +
    "  </div>\n" +
    "  <div class=\"category clearfix\" ng-if=\"products.length\">\n" +
    "    <div class=\"products\" infinite-scroll=\"loadMore()\" infinite-scroll-distance=\"2\" infinite-scroll-disabled=\"infiniteDisabled\">\n" +
    "      <div ng-repeat=\"product in products\" class=\"product\" ng-click=\"goToProduct(product)\">\n" +
    "        <img ng-src=\"{{ product.icon.__text }}\" />\n" +
    "        <h2>{{product.name}}</h2>\n" +
    "      <span class=\"price\">\n" +
    "        <span ng-show=\"product.price._special\">{{ product.price._special }} <span class=\"old\">{{product.price._regular}}</span></span>\n" +
    "        <span ng-hide=\"product.price._special\">{{ product.price._regular }} </span>\n" +
    "      </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"infiniteLoading && !infiniteDisabled\" class=\"infinite-scroll\">\n" +
    "    <div class=\"loader\"></div>\n" +
    "  </div>\n" +
    "  <br /><br /><br />\n" +
    "  <tracking ng-if=\"products && productsTracking\" data=\"{type:fromSearch ? 'search' : 'category', id: productsTracking}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/store/product-info.html',
    "<div ui-view>\n" +
    "  <menu-top back-enabled=\"-1\" menu-title=\"title\" error=\"error\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"page-product\" ng-if=\"product\">\n" +
    "    <form role=\"form\" name=\"connexion_form\">\n" +
    "      <fieldset>\n" +
    "        <legend>{{'product.description'|translate}}</legend>\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"content-padded\">\n" +
    "            <p ng-bind-html=\"product.description\"></p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </fieldset>\n" +
    "      <div ng-repeat=\"item in product.additional_attributes.item\" ng-hide=\"item.value.toLocaleLowerCase() == 'nein'\">\n" +
    "        <fieldset ng-if=\"item.label=='Specificities'\">\n" +
    "          <legend>{{'product.specificities'|translate}}</legend>\n" +
    "          <div class=\"form-group\">\n" +
    "            <div class=\"content-padded\">\n" +
    "              <p ng-bind-html=\"item.value\"></p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </fieldset>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "  <tracking ng-if=\"product\" data=\"{type:'product-info', id: product.entity_id, product: product}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );


  $templateCache.put('views/store/product.html',
    "<div ui-view>\n" +
    "  <menu-top ng-if=\"addedToCard\"  product=\"1\" menu-title=\"title\" error=\"error\"></menu-top>\n" +
    "  <menu-top ng-if=\"!addedToCard\" product=\"1\" menu-title=\"title\" error=\"error\" disabled-cart-footer=\"1\"></menu-top>\n" +
    "  <div loader ng-show=\"loading\"></div>\n" +
    "  <div class=\"page-product\" ng-if=\"product\">\n" +
    "    <div id=\"product-carousel\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
    "      <div class=\"carousel-demo\">\n" +
    "        <ul rn-carousel rn-carousel-index=\"carouselIndex\" rn-carousel-buffered rn-carousel-auto-slide >\n" +
    "          <li ng-repeat=\"image in images track by $index\" ng-class=\"{'item':true, 'active': $index==0}\">\n" +
    "            <img ng-src=\"{{image}}\" rad-rn-fix/>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <div ng-if=\"images.length > 1\" rn-carousel-indicators slides=\"images\" rn-carousel-index=\"carouselIndex\" class=\"text-center\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"like-share clearfix hide\">\n" +
    "      <span class=\"number\">849</span>\n" +
    "      <span class=\"share\">{{'product.share'|translate}}</span>\n" +
    "    </div>\n" +
    "    <form role=\"form\" class=\"product-form\" ng-submit=\"addToCart()\">\n" +
    "      <h2 class=\"clearfix\">\n" +
    "        <span class=\"title\"><span>{{product.name}}</span></span>\n" +
    "        <span class=\"price\">\n" +
    "          <span ng-show=\"product.price._special\">{{ product.price._special }} <span class=\"old\">{{product.price._regular}}</span></span>\n" +
    "          <span ng-hide=\"product.price._special\">{{ product.price._regular }} </span>\n" +
    "        </span>\n" +
    "      </h2>\n" +
    "      <div ng-repeat=\"option in options\" class=\"option-chooses\">\n" +
    "        <span class=\"pull-left\">{{option._label}}</span>\n" +
    "        <span class=\"pull-right\">\n" +
    "          <span ng-repeat=\"val in option.value\" ng-class=\"{item: true, 'item-value':true, active: val.active == true}\" ng-click=\"changeOption(option.value, val)\">\n" +
    "            {{ val._label | translate }}\n" +
    "          </span>\n" +
    "        </span>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "      </div>\n" +
    "      <div class=\"option-chooses\">\n" +
    "        <span class=\"pull-left\">{{'product.quantity'|translate }}</span>\n" +
    "        <span class=\"pull-right\">\n" +
    "          <span ng-click=\"delQty()\" class=\"item minus\"></span>\n" +
    "          <input class=\"qty\" readonly ng-model=\"quantity\" ng-value=\"quantity\" />\n" +
    "          <span ng-click=\"addQty()\" class=\"item plus\"></span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"product-added-success\" ng-show=\"success\">\n" +
    "        <div>{{ 'product.succes_add_cart' | translate }}</div>\n" +
    "      </div>\n" +
    "      <div class=\"add-to-cart\"><input type=\"submit\" ng-value=\"'product.add'|translate\"/></div>\n" +
    "      <div class=\"more-infomations\" ng-click=\"getInfos()\">{{'product.more_information'|translate}}</div>\n" +
    "      <div class=\"more-product hide\"><div class=\"title\">{{'product.more_products'|translate:'{brand:\"'+ product.name +'\"}'}}</div></div>\n" +
    "    </form>\n" +
    "    <br /><br /><br />\n" +
    "  </div>\n" +
    "  <tracking ng-if=\"product\" data=\"{type:'product', id: productId, product: product}\" type=\"all\"></tracking>\n" +
    "  <tracking ng-if=\"product && addedToCard\" data=\"{type:'add2cart', id: productId, product: product, qty: quantity}\" type=\"all\"></tracking>\n" +
    "</div>\n"
  );

}]);
