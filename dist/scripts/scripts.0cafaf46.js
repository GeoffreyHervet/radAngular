'use strict';

window._initFb = function(){
  FB.init({
    appId: 406695926021804,
    version: 'v2.4',
    cookie: false
  });
};
window.fbAsyncInit = function() {
  window._initFb();
};


(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

'use strict';

(function (){
  var addScript = function(url,content){
    var a = ['s','c','r','i','p','t'];
    var str = '<' + a.join('');
    if (url) {
      str += ' src="' + url + '">';
    }
    else {
      str += '>' + content;
    }
    str += '</' + a.join('') + '>';
    document.write(str);
  };

  // TRACKING

  //addScript('//connect.facebook.net/en_US/fbds.js');
  addScript('//platform.twitter.com/oct.js');

  // SDKS
  //addScript('//connect.facebook.net/es_LA/sdk.js');}

})();

'use strict';
window.scrollTo(0, 1);

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    //'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'xml',
    'config',
    'nl2br',
    'infinite-scroll',
    'uiSwitch',
    'payment',
    'angular-carousel',
    'ngAutocomplete'
  ])
  //.config(function($locationProvider){
    //$locationProvider.html5Mode(true);
  //})
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|sms|whatsapp|twitter|mailto|file):/);
  })
  .config(function ($translateProvider) {
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy(null);
  })
;

"use strict";

angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'https://www.rad.co',defaultLang:'fr'})

;
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
    "    <a class=\"btn-big-action\" ui-sref=\"app.auth\"><span>{{'register.use_rad_account'|translate}}</span></a>\n" +
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
    "  <div class=\"recap-order\" ng-if=\"!((details.empty && !(loading && details != null)) || (details.empty && loading))\">\n" +
    "    <tracking data=\"{type:'cart-confirmation', items: details.items, id: -1}\" type=\"all\"></tracking>\n" +
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
    "      <fieldset ng-if=\"sentence\">\n" +
    "        <legend ng-bind-html=\"sentence\"></legend>\n" +
    "      </fieldset>\n" +
    "        <fieldset ng-if=\"fullDetails.addresses.shipping_address\">\n" +
    "            <legend>{{'cart.recap.shipping'|translate}}</legend>\n" +
    "            <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.delivery\"><span translate class=\"address-details\">{{formatAddress(fullDetails.addresses.shipping_address)}}</span></a>\n" +
    "        </fieldset>\n" +
    "        <fieldset ng-if=\"fullDetails.addresses.billing_address\">\n" +
    "            <legend>{{'cart.recap.billing'|translate}}</legend>\n" +
    "            <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.billing\"><span translate class=\"address-details\">{{formatAddress(fullDetails.addresses.billing_address)}}</span></a>\n" +
    "        </fieldset>\n" +
    "      <fieldset>\n" +
    "        <legend>{{'cart.recap.payment'|translate}}</legend>\n" +
    "        <a class=\"btn-big-action change-page\" ui-sref=\"app.cart.payment\">\n" +
    "          <span ng-if=\"payPaypal\">\n" +
    "            Paypal\n" +
    "          </span>\n" +
    "          <span ng-if=\"!payPaypal\">\n" +
    "            <span ng-if=\"payData.card.new\">\n" +
    "              <i ng-class=\"{'card-ico': true, 'card-amex': payData.card.type == 'amex', 'card-visa': payData.card.type == 'visa', 'card-mastercard': payData.card.type == 'mastercard'}\"></i>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'amex'\">AMEX ({{payData.card.num}})</span>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'visa'\">VISA ({{payData.card.num}})</span>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'mastercard'\">MASTERCARD ({{payData.card.num}})</span>\n" +
    "            </span>\n" +
    "            <span ng-if=\"payData && !payData.card.new\">\n" +
    "              <i ng-class=\"{'card-ico': true, 'card-amex': payData.card.type == 'American Express', 'card-visa': payData.card.type == 'Visa', 'card-mastercard': payData.card.type == 'MasterCard'}\"></i>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'American Express'\">AMEX ({{payData.card.number.slice(-4)}})</span>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'Visa'\">VISA ({{payData.card.number.slice(-4)}})</span>\n" +
    "              <span class=\"txt\" ng-if=\"payData.card.type == 'MasterCard'\">MASTERCARD ({{payData.card.number.slice(-4)}})</span>\n" +
    "            </span>\n" +
    "            <span ng-if=\"!payData\"><i class=\"card-ico card-mastercard\"></i><span class=\"txt\" translate>cart.add_card</span></span>\n" +
    "          </span>\n" +
    "        </a>\n" +
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
    "    <br />\n" +
    "    <div class=\"alert-info alert\" ng-bind-html=\"'cart.legal'|translate:translateData\">\n" +
    "      <!--{{}}-->\n" +
    "    </div>\n" +
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
    "  <tracking ng-if=\"product\" data=\"{type:'cart-product-edit', product: product, qty:item.qty, id: product.entity_id}\" type=\"all\"></tracking>\n" +
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
    "  <div loader ng-show=\"masterLoading\"></div>\n" +
    "  <div class=\"address-list\">\n" +
    "    <!--<div class=\"item-wrapper-loader\" ng-show=\"loading\"><div class=\"loader\"></div></div>-->\n" +
    "    <a ng-repeat=\"card in payments\" class=\"item item-card\" href=\"javascript:;\" ng-click=\"usePayment(card)\">\n" +
    "      <i ng-class=\"{'picto-amex': card.type == 'American Express' || card.type.toLocaleUpperCase().trim() == 'AMERICAN EXPRESS', 'picto-visa': card.type == 'Visa', 'picto-mastercard': card.type == 'MasterCard'}\"></i>\n" +
    "      <span>{{ format(card) }}</span>\n" +
    "      <i class=\"picto-arrow-right\"></i>\n" +
    "    </a>\n" +
    "    <a ng-click=\"usePaypal()\" class=\"item item-add\">\n" +
    "      <span>{{'cart.use_paypal'|translate}}</span>\n" +
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
    "    <li ng-show=\"Lang.get()=='de'\" ui-sref-active=\"active\" data-close-menu-left class=\"help\"><a ui-sref=\"app.page({slug: 'agb'})\">{{'menu.cgv'|translate}}</a></li>\n" +
    "    <li ng-show=\"Lang.get()=='de'\" ui-sref-active=\"active\" data-close-menu-left class=\"help\"><a ui-sref=\"app.page({slug: 'impressum'})\">{{'Impressum'|translate}}</a></li>\n" +
    "    <li ng-show=\"Lang.get()=='de'\" ui-sref-active=\"active\" data-close-menu-left class=\"help\"><a ui-sref=\"app.page({slug: 'datenschutz'})\">{{'Datenschutz'|translate}}</a></li>\n" +
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
    "<smart-banner></smart-banner>\n" +
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
    "  <div class=\"cms-page\" cms-page=\"content\"></div>\n" +
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
    "        <img ng-src=\"{{ product.icon.__text.replace('http:','https:') }}\" />\n" +
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

"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('fr', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "app.free": "Gratuit",
    "app.title": "-10% depuis l'app !",
    "app.author": "Code EARLY10",
    "app.android": "Sur Google Play",
    "app.view": "INSTALLER",
    "lang": "Français",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland \/ Österreich)",
    "country": "France",
    "country.change": "Changer",
    "store.change": "Changer de boutique",
    "global.loading": "Chargement en cours",
    "404.product": "Produit non trouvé",
    "404.category": "Catégorie non trouvée",
    "login.with_facebook": "Se connecter avec Facebook",
    "login.or_register_email": "Connexion ou inscription par e-mail",
    "form.submit": "Valider",
    "form.connect": "Connexion",
    "form.use": "Utiliser",
    "form.edit": "Modifier",
    "form.state": "Merci de choisir un état",
    "error.connexion_lost": "Problème de connexion, veuillez re-essayer plus tard.",
    "error.unknown_reason": "Problème de connexion, veuillez re-essayer plus tard.",
    "error.facebook_rejected": "Vous ne vous êtes pas authentifié avec Facebook.",
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
    "error.phone_number": "Erreur sur le numéro de téléphone",
    "connexion.form.legend": "Veuillez saisir vos identifiants de connexion.",
    "connexion.form.email.placeholder": "Adresse email",
    "connexion.form.password.placeholder": "Mot de passe",
    "connexion.form.lost_password": "Mot de passe oublié",
    "connexion.facebook": "Se connecter avec facebook",
    "register.new_account": "Créer un nouveau compte",
    "register.title": "Inscription",
    "register.facebook": "S'inscrire avec Facebook",
    "register.form.legend": "Merci de renseigner tous les champs suivantes.",
    "register.form.firstname.placeholder": "Prénom",
    "register.form.lastname.placeholder": "Nom",
    "register.form.email.placeholder": "Adresse email",
    "register.form.password.placeholder": "Mot de passe",
    "register.form.birthday.placeholder": "31\/12\/2000",
    "register.form.cell.placeholder": "06 06 06 06 06",
    "search.empty": "Pas de résultats pour cette recherche.",
    "lostpass.title": "Mot de passe oublié",
    "lostpass.form.legend": "Veuillez renseigner votre adresse e-mail.",
    "lostpass.form.email.placeholder": "Adresse e-mail.",
    "lostpass.success": "Un e-mail vient d'être envoyé à {{email}} afin de réinitialiser votre mot de passe.",
    "menu.default": "Shop",
    "menu.search": "Recherche",
    "menu.center_title": "Menu",
    "menu.title": "Menu",
    "menu.cart": "Panier",
    "menu.profile": "Profil",
    "menu.orders": "Mes commandes",
    "menu.payments": "Mes cartes",
    "menu.addresses": "Mes adresses",
    "menu.free_orders": "Commande offerte",
    "menu.help": "Aide",
    "menu.logout": "Déconnexion",
    "menu.home": "Shop",
    "menu.login": "Connexion",
    "menu.cgv": "Termes & Conditions",
    "menu.new": "Nouveautés",
    "myaccount.myorders.title": "Mes commandes",
    "myaccount.myorders.noorders": "Pas de commandes",
    "myaccount.myorders.order_link": "Commande #{{id}} du {{date}}",
    "myaccount.order.title": "Commande #{{id}}",
    "myaccount.order.detail": "Détail de la commande",
    "myaccount.order.subTotal": "Sous-total",
    "myaccount.order.shipPrice": "Frais de livraison",
    "myaccount.order.credit": "Crédit d'achat",
    "myaccount.order.total": "Total",
    "myaccount.order.payment": "Mode de paiement",
    "myaccount.order.delivery": "Livraison",
    "myaccount.order.billing": "Facturation",
    "myaccount.profile.title": "Mon compte",
    "myaccount.profile.form_legend": "Informations personnelles",
    "myaccount.profile.free_order.title": "Commande offerte",
    "myaccount.profile.free_order.headline": "Faites découvrir Rad.co à vos amis et gagnez du crédit d’achat.",
    "myaccount.profile.free_order.submessage": "Invitez 10 amis et gagnez 30€ de crédit d'achat, invitez 25 amis et gagnez 50€.",
    "myaccount.profile.free_order.sharemsg": "Découvrez la mode sur Rad. Invitez vos amis et gagnez jusqu’à 50€ de crédits {{url}} #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Partager par message",
    "myaccount.profile.free_order.share.whatsapp": "Partager par WhatsApp",
    "myaccount.profile.free_order.share.facebook": "Partager par Facebook",
    "myaccount.profile.free_order.share.twitter": "Partager par Twitter",
    "myaccount.profile.free_order.credit_info": "Crédit disponible",
    "myaccount.profile.free_order.used": "{{amount}} dépensés",
    "myaccount.profile.free_order.available": "{{amount}} disponibles",
    "myaccount.profile.free_order.invit_info": "Nombre d’invitations envoyées.",
    "myaccount.profile.free_order.intit_sended": "{{number}} invitations envoyées",
    "myaccount.profile.email": "Adresse e-mail",
    "myaccount.profile.email_new": "Nouvelle adresse email",
    "myaccount.profile.current_password": "Mot de passe actuel",
    "myaccount.profile.current_email_is": "Votre adresse e-mail est actuellement {{email}}.",
    "myaccount.profile.password_help": "Rentrez le nouveau mot de passe puis l'ancien.",
    "myaccount.profile.password": "Mot de passe",
    "myaccount.profile.password_new": "Nouveau mot de passe",
    "myaccount.profile.settings": "Préférences",
    "myaccount.profile.newsletter": "Newsletter",
    "myaccount.profile.newsletter_help": "Je souhaiterai recevoir la newsletter de Rad.co afin de découvrir toutes les dernières infos, nouveautés; et offres spéciales.",
    "myaccount.profile.facebook_link": "Lier mon compte facebook",
    "myaccount.profile.cards": "Paiement",
    "myaccount.profile.no_cards": "Vous n'avez pas de carte de paiement enregistrée.",
    "myaccount.profile.card_info": "Informations de la carte",
    "myaccount.profile.remove_card": "Supprimer la carte",
    "myaccount.profile.addresses": "Adresses",
    "myaccount.profile.addresses_add": "Nouvelle adresse",
    "myaccount.profile.addresses_edit": "Détail de l'adresse",
    "myaccount.profile.remove_address": "Supprimer l'addresse",
    "myaccount.profile.address_edit_save": "Valider les changements",
    "product.description": "Description du produit.",
    "product.specificities": "Spécificités du produit",
    "product.product": "Produit",
    "product.products": "Produits",
    "product.quantity": "Quantité",
    "product.size": "Taille",
    "product.info": "Infos produit",
    "product.share": "Partager",
    "product.add": "Ajouter au panier",
    "product.more_information": "Plus d'infos sur le produit",
    "product.more_products": "Voir plus de produits {{brand}}",
    "product.succes_add_cart": "Produit ajouté au panier !",
    "cart.product_in_cart": "{{nb}} produit dans votre panier",
    "cart.products_in_cart": "{{nb}} produits dans votre panier",
    "cart.edit_empty": "Article non trouvé",
    "cart.confirm": "Confirmation",
    "cart.order": "Commander",
    "cart.reloading": "Mise à jour du panier en cours",
    "cart.title": "Panier",
    "cart.valid": "Valider mon panier",
    "cart.empty": "Votre panier est vide",
    "cart.pay": "Passer commande",
    "cart.success": "Récapitulatif",
    "cart.recap.payment": "Paiement",
    "cart.recap.shipping": "Livraison",
    "cart.recap.billing": "Facturation",
    "cart.recap.promo": "Code promo",
    "cart.recap.promo_placeholder": "Saisir un code promo",
    "cart.recap.promo_apply": "Appliquer le code promo",
    "cart.address.add": "Ajouter une adresse",
    "cart.add_card": "Ajouter un moyen de paiement",
    "cart.details": "détails",
    "cart.total.subtotal": "Sous-total",
    "cart.total.shipping": "Livraison",
    "cart.total.tax": "Dont TVA",
    "cart.total.grand_total": "Total de la commande",
    "cart.total.raaad_credit": "Crédits d'achat",
    "cart.total.discount": "Code promo",
    "cart.delivery.title": "Adresse de livraison",
    "cart.delivery.create_placeholder": "Merci de renseigner votre adresse de livraison.",
    "cart.delivery.firstname": "Prénom",
    "cart.delivery.lastname": "Nom",
    "cart.delivery.address": "Adresse",
    "cart.delivery.address2": "Complément d'adresse",
    "cart.delivery.city": "Ville",
    "cart.delivery.country": "Pays",
    "cart.delivery.postcode": "Code postal",
    "cart.delivery.tel": "Numéro de téléphone",
    "cart.delivery.use_for_billing": "Même adresse de facturation",
    "cart.billing.title": "Adresse de facturation",
    "cart.billing.create_placeholder": "Merci de renseigner votre adresse de facturation.",
    "cart.payment.title": "Paiement",
    "cart.payment.add": "Ajouter une carte",
    "cart.payment.add_placeholder": "Merci de renseigner vos informations de paiement",
    "cart.edit": "Éditer",
    "cart.edit_product": "Éditer le produit",
    "cart.remove": "Retirer du panier",
    "card.not_found": "Carte non trouvée",
    "card.owner": "Nom sur la carte",
    "card.number": "Numéro de carte",
    "card.exp_date": "Date d'expiration (ex: 12\/2018)",
    "card.cvc": "Cryptogramme",
    "card.reusable": "Mémoriser pour mes prochains achats",
    "card.error.number": "Numéro de carte erroné",
    "card.error.exp": "Date d'expiration erronée",
    "card.error.cvc": "Cryptogramme erroné",
    "TU": "Taille unique",
    "CONDITIONS GENERALES DE VENTE": "Conditions générales de vente",
    "error.empty.firstname": "Merci de renseigner le prénom",
    "error.empty.lastname": "Merci de renseigner le nom",
    "error.empty.street": "Merci de renseigner la rue",
    "error.empty.city": "Merci de renseigner la ville",
    "card.pay_data_present": "Pour des raisons de sécurité, vous ne pouvez pas éditer l'ancienne carte.",
    "success.thankyou": "MERCI !",
    "success.text": "Votre commande à bien été enregistrée. Vous allez bientôt recevoir un e-mail récapitulatif.",
    "success.title": "Commande confirmée",
    "card.pretext": "Ce moyen de paiement ne sera utilisé que lors de la validation finale de votre panier.",
    "form.card.save": "Enregistrer la carte",
    "cart.colis_date": "Votre commande sera livrée en <span class='blue'>__packs__<\/span> avant le <span class='blue'>__day__ __month__<\/span>",
    "cart.colis_package": "Colis",
    "cart.colis_packages": "Colis",
    "month.01": "Janvier",
    "month.02": "Février",
    "month.03": "Mars",
    "month.04": "Avril",
    "month.05": "Mai",
    "month.06": "Juin",
    "month.07": "Juillet",
    "month.08": "Août",
    "month.09": "Septembre",
    "month.10": "Octobre",
    "month.11": "Novembre",
    "month.12": "Décembre",
    "cart.legal": "En accord avec nos <a href='{{cgv}}' target='_blank'>Termes et Conditions<\/a>.",
    "register.use_rad_account": "Utiliser un compte existant",
    "The minimum password length is 6": "Le mot de passe doit faire au moins 6 de long."
}
);
  })
;
"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('de', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "app.free": "Gratis",
    "app.title": "-10% mit der App!",
    "app.author": "Code EARLY10",
    "app.android": "Bei Google Play",
    "app.view": "INSTALLIEREN",
    "lang": "Deutsch",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland \/ Österreich)",
    "country": "Deutschland",
    "country.change": "Ändern",
    "store.change": "Shop wechseln",
    "global.loading": "Wird geladen",
    "404.product": "Produkt konnte nicht gefunden werden",
    "404.category": "Kategorie konnte nicht gefunden werden",
    "login.with_facebook": "Mit Facebook anmelden",
    "login.or_register_email": "Anmeldung oder Registrierung via E-Mail",
    "form.submit": "Bestätigen",
    "form.connect": "Anmelden",
    "form.use": "Verwenden",
    "form.edit": "Bearbeiten",
    "form.state": "",
    "error.connexion_lost": "Probleme bei der Anmeldung, bitte versuchen Sie es später erneut.",
    "error.unknown_reason": "Probleme bei der Anmeldung, bitte versuchen Sie es später erneut.",
    "error.facebook_rejected": "Leider konnten Sie nicht über Facebook angemeldet werden.",
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
    "error.phone_number": "Ungültige Handynummer",
    "connexion.form.legend": "Bitte geben Sie Ihre Anmeldedaten ein.",
    "connexion.form.email.placeholder": "E-Mail-Adresse",
    "connexion.form.password.placeholder": "Passwort",
    "connexion.form.lost_password": "Passwort vergessen?",
    "connexion.facebook": "Mit Facebook anmelden",
    "register.new_account": "Konto erstellen",
    "register.title": "Registrierung",
    "register.facebook": "Mit Facebook registrieren",
    "register.form.legend": "Bitte füllen Sie alle nachfolgenden Felder aus. ",
    "register.form.firstname.placeholder": "Vorname",
    "register.form.lastname.placeholder": "Nachname",
    "register.form.email.placeholder": "E-Mail-Adresse",
    "register.form.password.placeholder": "Passwort",
    "register.form.birthday.placeholder": "31\/12\/2000",
    "register.form.cell.placeholder": "06 06 06 06 06",
    "search.empty": "Keine Artikel gefunden.",
    "lostpass.title": "Passwort vergessen",
    "lostpass.form.legend": "Bitte geben Sie Ihre E-Mail-Adresse an.",
    "lostpass.form.email.placeholder": "E-Mail-Adresse.",
    "lostpass.success": "Sie erhalten in Kürze eine E-Mail an {{email}}, um Ihr Passwort zurückzusetzen.",
    "menu.default": "Shop",
    "menu.search": "Suchen",
    "menu.center_title": "Menu",
    "menu.title": "Menu",
    "menu.cart": "Einkaufstasche",
    "menu.profile": "Mein Konto",
    "menu.orders": "Bestellungen",
    "menu.payments": "Zahlung",
    "menu.addresses": "Meine Adressen",
    "menu.free_orders": "Guthaben",
    "menu.help": "Hilfe",
    "menu.logout": "Abmelden",
    "menu.home": "Shop",
    "menu.login": "Anmelden",
    "menu.cgv": "AGB",
    "menu.new": "Neu",
    "myaccount.myorders.title": "Bestellungen",
    "myaccount.myorders.noorders": "Keine Bestellungen",
    "myaccount.myorders.order_link": "Bestellung #{{id}} vom {{date}}",
    "myaccount.order.title": "Bestellung #{{id}} ",
    "myaccount.order.detail": "Details der Bestellung",
    "myaccount.order.subTotal": "Zwischensumme",
    "myaccount.order.shipPrice": "Versandkosten",
    "myaccount.order.credit": "Kaufguthaben",
    "myaccount.order.total": "Gesamtbetrag",
    "myaccount.order.payment": "Zahlungsart",
    "myaccount.order.delivery": "Lieferadresse",
    "myaccount.order.billing": "Rechnungsadresse",
    "myaccount.profile.title": "Mein Konto",
    "myaccount.profile.form_legend": "Persönliche Informationen",
    "myaccount.profile.free_order.title": "Guthaben",
    "myaccount.profile.free_order.headline": "Freunde einladen und Einkaufsguthaben erhalten",
    "myaccount.profile.free_order.submessage": "10 Freunde einladen und Sie erhalten 30 € Einkaufsguthaben, bei 25 Freunden sogar 50 €.",
    "myaccount.profile.free_order.sharemsg": "Entdecken Sie urbane Mode auf Rad. Freunde einladen und bis zu 50 €  Kaufguthaben auf {{url}} erhalten. #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Via Nachricht einladen",
    "myaccount.profile.free_order.share.whatsapp": "Via WhatsApp einladen",
    "myaccount.profile.free_order.share.facebook": "Via Facebook einladen",
    "myaccount.profile.free_order.share.twitter": "via Twitter einladen",
    "myaccount.profile.free_order.credit_info": "Verfügbares Guthaben.",
    "myaccount.profile.free_order.used": "{{amount}} ausgegeben",
    "myaccount.profile.free_order.available": "{{amount}} verfügbar",
    "myaccount.profile.free_order.invit_info": "Anzahl der versendeten Einladungen.",
    "myaccount.profile.free_order.intit_sended": "{{number}} Einladungen versendet",
    "myaccount.profile.email": "E-Mail-Adresse",
    "myaccount.profile.email_new": "Neue E-Mail-Adresse",
    "myaccount.profile.current_password": "Aktuelles Passwort",
    "myaccount.profile.current_email_is": "Ihre aktuelle E-Mail-Adresse lautet {{email}}.",
    "myaccount.profile.password_help": "Bitte geben Sie Ihr neues Passwort und darunter Ihr aktuelles Passwort ein.",
    "myaccount.profile.password": "Passwort",
    "myaccount.profile.password_new": "Neues Passwort",
    "myaccount.profile.settings": "Einstellungen",
    "myaccount.profile.newsletter": "Newsletter",
    "myaccount.profile.newsletter_help": "Ich möchte gerne den Newsletter von Rad.co erhalten, um über die aktuellsten Informationen, Neuheiten und Angebote informiert zu werden.",
    "myaccount.profile.facebook_link": "Verknüpfen Sie mein Facebook-Konto.",
    "myaccount.profile.cards": "Zahlung",
    "myaccount.profile.no_cards": "Sie haben keine Kreditkarte registriert.",
    "myaccount.profile.card_info": "Informationen zu Ihrer Kreditkarte",
    "myaccount.profile.remove_card": "Meine Kreditkarte entfernen",
    "myaccount.profile.addresses": "Adressen",
    "myaccount.profile.addresses_add": "Neue Adresse",
    "myaccount.profile.addresses_edit": "Details der Adresse",
    "myaccount.profile.remove_address": "Adresse entfernen",
    "myaccount.profile.address_edit_save": "Änderungen bestätigen",
    "product.description": "Produktbeschreibung",
    "product.specificities": "Produktspezifikationen",
    "product.product": "Produkt",
    "product.products": "Produkte",
    "product.quantity": "Anzahl",
    "product.size": "Größe",
    "product.info": "Informationen",
    "product.share": "Teilen",
    "product.add": "In die Tasche",
    "product.more_information": "Weitere Informationen zum Produkt",
    "product.more_products": "Weitere Produkte von {{brand}} ansehen",
    "product.succes_add_cart": "Produkt wurde hinzugefügt!",
    "cart.product_in_cart": "{{nb}} Produkt in Ihrer Tasche",
    "cart.products_in_cart": "{{nb}} Produkte in Ihrer Tasche",
    "cart.edit_empty": "Artikel konnte nicht gefunden werden",
    "cart.confirm": "Bestätigung",
    "cart.order": "Zur Tasche",
    "cart.reloading": "Einkaufstasche aktualisieren",
    "cart.title": "Einkaufstasche",
    "cart.valid": "Zur Kasse",
    "cart.empty": "Ihre Einkaufstasche ist leer.",
    "cart.pay": "Jetzt kaufen",
    "cart.success": "Zusammenfassung",
    "cart.recap.payment": "Zahlung",
    "cart.recap.shipping": "Lieferadresse",
    "cart.recap.billing": "Rechnungsadresse",
    "cart.recap.promo": "Rabattcode",
    "cart.recap.promo_placeholder": "Rabattcode eingeben",
    "cart.recap.promo_apply": "Rabattcode einlösen",
    "cart.address.add": "Adresse hinzufügen",
    "cart.add_card": "Fügen Sie eine Kreditkarte hinzu",
    "cart.details": "Details",
    "cart.total.subtotal": "Zwischensumme",
    "cart.total.shipping": "Lieferung und Versand",
    "cart.total.tax": "Inklusive MwSt.",
    "cart.total.grand_total": "Gesamtbetrag inkl. MwSt. ",
    "cart.total.raaad_credit": "Rad Guthaben",
    "cart.total.discount": "Rabattcode",
    "cart.delivery.title": "Lieferadresse",
    "cart.delivery.create_placeholder": "Bitte geben Sie Ihre Lieferadresse an.",
    "cart.delivery.firstname": "Vorname",
    "cart.delivery.lastname": "Nachname",
    "cart.delivery.address": "Adresse",
    "cart.delivery.address2": "Adresszusatz\/Firma",
    "cart.delivery.city": "Stadt",
    "cart.delivery.country": "Land",
    "cart.delivery.postcode": "Postleitzahl",
    "cart.delivery.tel": "Handynummer",
    "cart.delivery.use_for_billing": "Gleiche Rechnungsadresse",
    "cart.billing.title": "Rechnungsadresse",
    "cart.billing.create_placeholder": "Bitte geben Sie Ihre Rechnungsadresse an.",
    "cart.payment.title": "Zahlung",
    "cart.payment.add": "Eine Kreditkarte hinzufügen",
    "cart.payment.add_placeholder": "Bitte geben Sie Ihre Zahlungsinformationen an.",
    "cart.edit": "Bearbeiten",
    "cart.edit_product": "Produkt bearbeiten",
    "cart.remove": "Aus der Tasche entfernen",
    "card.not_found": "Karte konnte nicht gefunden werden",
    "card.owner": "Name des Karteninhabers",
    "card.number": "Kreditkartennummer",
    "card.exp_date": "Ablaufdatum (z.B.: 12\/2018)",
    "card.cvc": "Prüfnummer",
    "card.reusable": "Diese Angaben zur späteren Verwendung speichern.",
    "card.error.number": "Kreditkartennummer ist inkorrekt.",
    "card.error.exp": "Ablaufdatum ist inkorrekt.",
    "card.error.cvc": "Prüfnummer ist inkorrekt.",
    "TU": "OS",
    "CONDITIONS GENERALES DE VENTE": "Terms and conditions",
    "error.empty.firstname": "Bitte geben Sie Ihren Vornamen an.",
    "error.empty.lastname": "Bitte geben Sie Ihren Nachnamen an.",
    "error.empty.street": "Bitte geben Sie Ihre Straße und Hausnummer an.",
    "error.empty.city": "Bitte geben Sie Ihre Stadt an.",
    "card.pay_data_present": "Aus Sicherheitsgründen können Sie die bereits gespeicherten Kreditkartendaten nicht verändern.",
    "success.thankyou": "DANKE !",
    "success.text": "Ihre Bestellung ist bei uns eingetroffen. Eine Bestellbestätigung wurde an Ihre E-Mail-Adresse gesendet.",
    "success.title": "Bestätigung",
    "card.pretext": "Die von Ihnen angegebenen Zahlungsinformationen werden nur nach Abschluss Ihrer Bestellung verwendet.",
    "form.card.save": "Diese Kreditkarte verwenden",
    "cart.colis_date": "Ihre Bestellung wird in <span class='blue'>__packs__<\/span> um den <span class='blue'>__day__ __month__<\/span> geliefert.",
    "cart.colis_package": "Paket",
    "cart.colis_packages": "Paketen",
    "month.01": "Januar",
    "month.02": "Februar",
    "month.03": "März",
    "month.04": "April",
    "month.05": "Mai",
    "month.06": "Juni",
    "month.07": "Juli",
    "month.08": "August",
    "month.09": "September",
    "month.10": "Oktober",
    "month.11": "November",
    "month.12": "Dezember",
    "cart.legal": "Wenn Sie auf JETZT KAUFEN klicken, bestätigen Sie unsere <a href='{{agb}}' target='_blank'>AGB<\/a> und <a href='{{Daten}}' target='_blank'>Datenschutzbestimmungen.<\/a>",
    "register.use_rad_account": "Verwenden Sie ein vorhandenes Konto",
    "The minimum password length is 6": "The minimum password length is 6."
}
);
  })
;
"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('uk', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "app.free": "Free",
    "app.title": "10% off on our app!",
    "app.author": "Code EARLY10",
    "app.android": "On Google Play",
    "app.view": "INSTALL",
    "lang": "English",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland \/ Österreich)",
    "country": "UK",
    "country.change": "Change",
    "store.change": "Change",
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
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
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
    "search.empty": "No item found.",
    "lostpass.title": "Lost password",
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
    "menu.new": "New",
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
    "myaccount.profile.free_order.credit_info": "Available credits",
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
    "cart.add_card": "Add a payment card",
    "cart.details": "Details",
    "cart.total.subtotal": "Subtotal",
    "cart.total.shipping": "Shipping",
    "cart.total.tax": "Included VAT",
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
    "cart.delivery.country": "",
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
    "card.exp_date": "Expiration Date (ex: 12\/2018)",
    "card.cvc": "Card Verification Number",
    "card.reusable": "Save card for future purchases",
    "card.error.number": "Incorrect Card Number",
    "card.error.exp": "Incorrect Expiration Date",
    "card.error.cvc": "Incorrect Card Verification Number",
    "TU": "One size",
    "CONDITIONS GENERALES DE VENTE": "Terms and conditions",
    "error.empty.firstname": "Please fill your firstname",
    "error.empty.lastname": "Please fill your name",
    "error.empty.street": "Please fill your street",
    "error.empty.city": "Please fill your city",
    "card.pay_data_present": "For security reasons, you will not able to modify your previous card informations",
    "success.thankyou": "THANK YOU!",
    "success.text": "Your order been placed. You will receive a confirmation email.",
    "success.title": "Confirmed order",
    "card.pretext": "This card will only be used at the next step when you validate your cart.",
    "form.card.save": "Save this card",
    "cart.colis_date": "Your order will be ship in <span class='blue'>__packs__<\/span> around <span class='blue'>__month__ __day__ <\/span>",
    "cart.colis_package": "Package",
    "cart.colis_packages": "Packages",
    "month.01": "January",
    "month.02": "February",
    "month.03": "March",
    "month.04": "April",
    "month.05": "May",
    "month.06": "June",
    "month.07": "Jully",
    "month.08": "August",
    "month.09": "September",
    "month.10": "October",
    "month.11": "November",
    "month.12": "December",
    "cart.legal": "According to our <a href='{{terms}}' target='_blank'>Terms & Conditions<\/a>.",
    "register.use_rad_account": "Use an existing account"
}
);
  })
;
"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('us', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "app.free": "Free",
    "app.title": "10% off on our app!",
    "app.author": "Code EARLY10",
    "app.android": "On Google Play",
    "app.view": "INSTALL",
    "lang": "English",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland \/ Österreich)",
    "country": "USA",
    "country.change": "Change",
    "store.change": "Change",
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
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
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
    "search.empty": "No item found.",
    "lostpass.title": "Lost password",
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
    "menu.new": "New",
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
    "myaccount.profile.free_order.submessage": "Invite 10 friends and get $30 in credits, 25 friends get $50.",
    "myaccount.profile.free_order.sharemsg": "Discover urban fashion on Rad. Invite your friends and get up to $50 to spend {{url}} #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Share via message",
    "myaccount.profile.free_order.share.whatsapp": "Share via WhatsApp",
    "myaccount.profile.free_order.share.facebook": "Share via Facebook",
    "myaccount.profile.free_order.share.twitter": "Share via Twitter",
    "myaccount.profile.free_order.credit_info": "Available credits",
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
    "cart.add_card": "Add a payment card",
    "cart.details": "Details",
    "cart.total.subtotal": "Subtotal",
    "cart.total.shipping": "Shipping",
    "cart.total.tax": "Included VAT",
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
    "cart.delivery.country": "",
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
    "card.exp_date": "Expiration Date (ex: 12\/2018)",
    "card.cvc": "Card Verification Number",
    "card.reusable": "Save card for future purchases",
    "card.error.number": "Incorrect Card Number",
    "card.error.exp": "Incorrect Expiration Date",
    "card.error.cvc": "Incorrect Card Verification Number",
    "TU": "One size",
    "CONDITIONS GENERALES DE VENTE": "Terms and conditions",
    "error.empty.firstname": "Please fill your firstname",
    "error.empty.lastname": "Please fill your name",
    "error.empty.street": "Please fill your street",
    "error.empty.city": "Please fill your city",
    "card.pay_data_present": "For security reasons, you will not able to modify your previous card informations",
    "success.thankyou": "THANK YOU!",
    "success.text": "Your order been placed. You will receive a confirmation email.",
    "success.title": "Confirmed order",
    "card.pretext": "This card will only be used at the next step when you validate your cart.",
    "form.card.save": "Save this card",
    "cart.colis_date": "Your order will be ship in <span class='blue'>__packs__<\/span> around <span class='blue'>__month__ __day__ <\/span>",
    "cart.colis_package": "Package",
    "cart.colis_packages": "Packages",
    "month.01": "January",
    "month.02": "February",
    "month.03": "March",
    "month.04": "April",
    "month.05": "May",
    "month.06": "June",
    "month.07": "Jully",
    "month.08": "August",
    "month.09": "Septembre",
    "month.10": "October",
    "month.11": "November",
    "month.12": "December",
    "cart.legal": "According to our <a href='{{terms}}' target='_blank'>Terms & Conditions<\/a>.",
    "register.use_rad_account": "Use an existing account"
}
);
  })
;
'use strict';

angular
  .module('angularApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('test', {
        url: '/',
        template: '<ui-view/>',
        controller: 'RootCtrl'
      })
      .state('app', {
        abstract: true,
        url: '/{store:(?:fr|uk|us|de)}',
        template: '<ui-view/>',
        controller: 'RootCtrl'
      })
      .state('app.store', {
        url: '',
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })

      .state('app.auth', {
        url: '/auth',
        parent: 'app',
        templateUrl: 'views/auth/connexion.html',
        controller: 'ConnexionCtrl'
      })
      .state('app.auth.logout', {
        url:  '/auth/logout',
        parent: 'app',
        templateUrl: 'views/auth/logout.html',
        controller: 'LogoutCtrl'
      })
      .state('app.auth.register', {
        url: '/auth/register',
        parent: 'app',
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .state('app.auth-register', {
        url: '/auth-register',
        parent: 'app',
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .state('app.auth.lost_password', {
        url: '/auth/lost-password',
        parent: 'app',
        templateUrl: 'views/auth/lost-password.html',
        controller: 'LostPasswordCtrl'
      })
      .state('app.my-account',{
        url: '/my-account',
        parent: 'app',
        templateUrl: 'views/account/profile.html',
        controller: 'MyAccountProfileCtrl'
      })
      .state('app.my-account.orders', {
        url: '/my-account/orders',
        parent: 'app',
        templateUrl: 'views/account/my-orders.html',
        controller: 'MyOrdersCtrl'
      })
      .state('app.my-account.orders.show', {
        url: '/my-account/order/:num/:id',
        parent: 'app',
        templateUrl: 'views/account/order-recap.html',
        controller: 'OrderRecapCtrl'
      })
      .state('app.my-account.email', {
        url: '/my-account/email',
        parent: 'app',
        templateUrl: 'views/account/email.html',
        controller: 'MyAccountProfileEmailCtrl'
      })
      .state('app.my-account.password', {
        url: '/my-account/password',
        parent: 'app',
        templateUrl: 'views/account/password.html',
        controller: 'MyAccountProfilePasswordCtrl'
      })
      .state('app.my-account.cards', {
        url: '/my-account/cards',
        parent: 'app',
        templateUrl: 'views/account/cards.html',
        controller: 'MyAccountCardsCtrl'
      })
      .state('app.my-account.cards.show', {
        url: '/my-account/card/:id',
        parent: 'app',
        templateUrl: 'views/account/card-detail.html',
        controller: 'MyAccountCardsDetailCtrl'
      })
      .state('app.my-account.addresses', {
        url: '/my-account/addresses',
        parent: 'app',
        templateUrl: 'views/account/addresses.html',
        controller: 'MyAccountAddressesCtrl'
      })
      .state('app.my-account.addresses.add', {
        url: '/my-account/address/add',
        parent: 'app',
        templateUrl: 'views/account/address-add.html',
        controller: 'MyAccountAddressesAddCtrl'
      })
      .state('app.my-account.addresses.edit', {
        url: '/my-account/address/:id',
        parent: 'app',
        templateUrl: 'views/account/address-edit.html',
        controller: 'MyAccountAddressesEditCtrl'
      })
      .state('app.my-account.free-orders', {
        url: '/my-account/free-orders',
        parent: 'app',
        templateUrl: 'views/account/free-orders.html',
        controller: 'MyAccountFreeOrdersCtrl'
      })
      .state('app.page', {
        url: '/page/:slug',
        parent: 'app',
        templateUrl: 'views/pages/cms.html',
        controller: 'CmsPageCtrl'
      })
      .state('app.store.search', {
        url: '/search?q',
        //parent: 'app',
        templateUrl: 'views/store/category.html',
        controller: 'SearchCtrl'
      })
      .state('app.store.category', {
        url: '/category/:categoryslug',
        templateUrl: 'views/store/category.html',
        controller: 'CategoryCtrl'
      })
      .state('app.store.category.product', {
        url: '/:productslug',
        //parent: 'app',
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.store.search.product', {
        url: '/:productslug',
        //parent: 'app',
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.store.category.product.info', {
        url: '/info',
        //parent: 'app',
        templateUrl: 'views/store/product-info.html',
        controller: 'ProductInfoCtrl'
      })
      .state('app.store.product', {
        url: '/product/:productslug',
        parent: 'app',
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.store.product.info', {
        url: '/info',
        templateUrl: 'views/store/product-info.html',
        controller: 'ProductInfoCtrl'
      })
      .state('app.store.search.product.info', {
        //url: '/info',
        templateUrl: 'views/store/product-info.html',
        controller: 'ProductInfoCtrl'
      })
      .state('app.cart', {
        url: '/cart',
        parent: 'app',
        templateUrl: 'views/store/cart.html',
        controller: 'CartCtrl'
      })
      .state('app.cart.edit', {
        url: '/cart/edit/:itemId',
        parent: 'app',
        templateUrl: 'views/cart/edit.html',
        controller: 'CartEditCtrl'
      })
      .state('app.cart.delivery', {
        url: '/cart/delivery',
        parent: 'app',
        templateUrl: 'views/cart/delivery-address-list.html',
        controller: 'CartDeliveryAddressListCtrl'
      })
      .state('app.cart.delivery.new', {
        url: '/cart/delivery/new',
        parent: 'app',
        templateUrl: 'views/cart/delivery-address-create.html',
        controller: 'CartCreateDeliveryAddressCtrl'
      })
      .state('app.cart.billing', {
        url: '/cart/billing',
        parent: 'app',
        templateUrl: 'views/cart/billing-address-list.html',
        controller: 'CartBillingAddressListCtrl'
      })
      .state('app.cart.billing.new', {
        url: '/cart/billing/new',
        parent: 'app',
        templateUrl: 'views/cart/billing-address-create.html',
        controller: 'CartCreateBillingAddressCtrl'
      })
      .state('app.cart.payment', {
        url: '/cart/payments',
        parent: 'app',
        templateUrl: 'views/cart/payment-list.html',
        controller: 'CartPaymentListCtrl'
      })
      .state('app.cart.payment.add', {
        url: '/cart/payment/add',
        parent: 'app',
        templateUrl: 'views/cart/payment-add.html',
        controller: 'CartPaymentAddCtrl'
      })
      .state('app.cart.confirm', {
        url: '/cart/confirmation',
        parent: 'app',
        templateUrl: 'views/cart/confirm.html',
        controller: 'CartConfirmCtrl'
      })
      .state('app.cart.success', {
        url: '/cart/success',
        parent: 'app',
        templateUrl: 'views/account/order-recap.html',
        controller: 'SuccessCtrl'
      })
    ;
    $urlRouterProvider.otherwise('/');
  })
;

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, ApiLink, $cookies, $http, LocalStorage, Utils, $state, Configuration, Lang, User) {
    $scope.inserts  = LocalStorage.getObject('home/inserts');
    $scope.carousels = LocalStorage.getObject('home/carousel');
    $scope.Utils = Utils;
    $scope.isLoading = {val: false};

    User.setBackPath('/#/' + Lang.get());

    if (!$scope.inserts && !$scope.carousels) {
      $scope.loading = true;
      $http
        .get(ApiLink.getApiBase() + '/raaad_xmlconnect/index/index/app_code/' + ApiLink.getAppCode() + '/level/1')
        .then(function(response) {
          $scope.loading = false;
          if (response.data && response.data.home && response.data.home.inserts) {
            $scope.inserts = Utils.arrayfy(response.data.home.inserts.insert);
            $scope.carousels = Utils.arrayfy(response.data.home.carousel.insert);
            LocalStorage.putObject('home/inserts', $scope.inserts);
            LocalStorage.putObject('home/carousel', $scope.carousels);
          }
        }, function() {
          $scope.loading = false;
        })
      ;

    }
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LoginCtrl', function ($scope) {
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ConnexionctrlCtrl
 * @description
 * # ConnexionctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ConnexionCtrl', function ($scope, User, $location, $q, $timeout, Cart, Lang) {
    $scope.title = 'menu.login';
    var logoutPromise;
    if (User.isLoggued()) {
      logoutPromise = User.logout();
    }
    else  {
      logoutPromise = $q(function(solve){
        $timeout(function(){ solve(); }, 100);
      });
    }

    // Credentials
    $scope.email = '';
    $scope.password = '';

    $scope.loading = false;
    $scope.error = null;

    $scope.submitForm = function() {

      $scope.loading = true;
      $scope.error = null;

      User
        .login($scope.email, $scope.password)
        .then(
          function(data) {
            if (data.message.status == 'success') {
              Cart.reload();
              var back = User.getBackPath();
              location.href = back;
            } else {
              $scope.loading = false;
              $scope.error = data.message.text;
            }
          },
          function() {
            $scope.loading = false;
            $scope.error = 'error.connexion_lost';
          }
      );

      return false;
    };


    $scope.facebookAuth = function() {
      $scope.loading = true;
      User
        .facebookAuth()
        .then(function () {
          Cart.reload();
          var back = User.getBackPath();
          location.href = back;
        }, function (error) {
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    //if ((navigator.userAgent.match('CriOS') || window.devmode)) {
    //  $scope.facebookAuth = function(){
    //    if (Lang.get() == 'fr') {
    //      alert('Pour vous connecter avec facebook, merci d\'utiliser Safari.');
    //    }
    //    else  {
    //      alert('For sign-in with Facebook, please use Safari.');
    //    }
    //  };
    //}

    var hash = location.href.split('code=');
    if (hash.length > 1) {
      $scope.loading = true;

      var process = function(){
        logoutPromise.then(function() {
          User.facebookAuth(hash[1].split('#')[0])
            .then(function () {
              Cart.reload();
              var back = User.getBackPath();
              location.href = back;
            }, function (error) {
              $scope.loading = false;
              $scope.error = error;
            });
        });
      };

      if (!window.FB) {
        window.fbAsyncInit = function() {
          window._initFb();
          process();
        };
      }
      else{
        process();
      }
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RegisterCtrl', function ($scope, User, $location, LocalStorage) {
    $scope.title = 'register.title';

    // Credentials
    $scope.firstname = '';
    $scope.lastname  = '';
    $scope.email     = '';
    $scope.password  = '';

    $scope.loading  = false;
    $scope.error    = null;
    $scope.errors   = null;

    var getParams = function(){
      LocalStorage.put('firstname', $scope.firstname);
      LocalStorage.put('lastname',  $scope.lastname);
      return {
        email:          $scope.email,
        password:       $scope.password,
        confirmation:   $scope.password,
        is_subscribed:  true,
        firstname:      $scope.firstname,
        lastname:       $scope.lastname
      }
    };

    $scope.submitForm = function() {
      $scope.loading  = true;
      $scope.error    = null;
      $scope.errors   = null;
      User
        .register(getParams())
        .then(function(data){
          if (data.message.status == 'success') {
            var back = User.getBackPath();
            location.href = back;
          } else {
            $scope.loading = false;
            $scope.errors  = data.message.text;
          }
        }, function(e){
          $scope.loading = false;
          $scope.error = e ? e : 'error.connexion_lost';
        })
      ;
    };

    $scope.facebookAuth = function(){
      $scope.loading = true;
      User
        .facebookAuth()
        .then(function(){
          var back = User.getBackPath();
          location.href = back;
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    //if ((navigator.userAgent.match('CriOS') || window.devmode)) {
    //  $scope.facebookAuth = function(){
    //    if (Lang.get() == 'fr') {
    //      alert('Pour vous connecter avec facebook, merci d\'utiliser Safari.');
    //    }
    //    else  {
    //      alert('For sign-in with Facebook, please use Safari.');
    //    }
    //  };
    //}


  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LostpasswordCtrl
 * @description
 * # LostpasswordCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LostPasswordCtrl', function ($scope, User, $timeout, $location) {
    $scope.title = 'lostpass.title';

    $scope.email = '';
    $scope.loading = false;
    $scope.error = null;
    $scope.false = true;

    $scope.submitForm = function(){
      $scope.loading = true;
      $scope.error = null;

      User
        .forgotPassword($scope.email)
        .then(function(data){
          $scope.loading = false;
          if (data.message.status == 'success') {
            $scope.success = 'lostpass.success';
            $scope.error = null;
            $scope.translateData = {email: $scope.email};
            $timeout(function(){
              var back = User.getBackPath();
              location.href = back;
            }, 2500);
          }
          else {
            $scope.error = data.message.text;
          }

        }, function(){
          $scope.loading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;

    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('LogoutCtrl', function ($state, User, $timeout, LocalStorage, $cookies, $cookieStore) {
    User.logout();
    LocalStorage.clear();
    angular.forEach($cookies, function (v, k) {
      $cookieStore.remove(k);
    });
    $state.go('app.store');
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CategoryctrlCtrl
 * @description
 * # CategoryctrlCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CategoryCtrl', function ($scope, $stateParams, $state, Category, Utils, $timeout) {
    $scope.categoryId = parseInt($stateParams.categoryslug);
    $scope.page       = 0;
    $scope.title      = 'global.loading';
    $scope.loaded     = false;
    $scope.infiniteLoading = false;
    $scope.infiniteDisabled = true;
    $scope.productsTracking = null;

    if (isNaN($scope.categoryId)) {
      return $state.go('app.store');
    }

    if (isNaN($scope.page)) {
      $scope.page = 0;
    }

    $scope.loading = true;
    $scope.category = null;

    Category
      .get($scope.categoryId, $scope.page)
      .then(function(category){
        $scope.loading = false;
        if (!category.products) {
          return $scope.error = true;
        }
        //$scope.title = category.items.item.label;
        $scope.category = category;
        $scope.title = category.category_info.title;
        $scope.products = category.products.item;
        var productsTracking = [];
        angular.forEach($scope.products, function(product){
          productsTracking.push(product.entity_id);
        });
        $scope.productsTracking = productsTracking;
        $timeout(function(){$scope.infiniteDisabled = false;});
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;

    $scope.loadMore = function(){
      if ($scope.infiniteLoading || $scope.infiniteDisabled) {
        return ;
      }
      $scope.infiniteLoading = true;
      Category
        .get($scope.categoryId, ++$scope.page)
        .then(function(category){
          $scope.infiniteLoading = false;
          if (!category.products) {
            return $scope.infiniteDisabled = true;
          }
          angular.forEach(category.products.item, function(key) {
            $scope.category.products.item.push(key);
          });
        }, function(){
          $scope.infiniteLoading = false;
        })
      ;
    };

    $scope.goToProduct = function(product) {
      $state.go('app.store.category.product', {productslug: product.entity_id + '-' + Utils.slugify(product.name)});
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductCtrl', function ($scope, $stateParams, Product, Cart, $timeout, Utils, $state, Configuration) {
    $scope.productId  = parseInt($stateParams.productslug);
    $scope.title      = 'global.loading';

    $scope.loading      = true;
    $scope.error        = false;
    $scope.product      = null;
    $scope.images       = [];
    $scope.options      = [];
    $scope.quantity     = 1;
    $scope.addedToCard  = false;

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading  = false;
        $scope.product  = product;
        $scope.images   = [];
        angular.forEach(Utils.arrayfy(product.images.image), function(img){
          $scope.images.push(img.file._url.replace('http:','https:'));
        });
        $timeout(function(){
          $scope.title = product.name + '';
        });
        $scope.options  = Array.isArray(product.product.options.option) ? product.product.options.option : [product.product.options.option];
        if (!product.product.options.option) {
          $scope.options = [];
        }
        else {
          angular.forEach($scope.options, function(val, key) {
            $scope.options[key].value = Utils.arrayfy(val.value);
          });

          if ($scope.options.length == 1) {
            try {
              $scope.options[0].value[0].active = true;
            }
            catch (e) {
            }
          }
        }
      }, function(){
        $scope.error = true;
        $scope.loading = false;
      })
    ;

    $scope.changeOption = function(opts, val) {
      angular.forEach(opts, function(value) {
        value.active = (val._code == value._code);
      });
    };

    $scope.error = null;

    $scope.addToCart = function() {
      $scope.success    = null;
      $scope.error   = null;
      $scope.loading    = true;
      Cart
        .addProduct($scope.productId, $scope.quantity, serializedOptions())
        .then(function(message){
          $scope.trackingData = {product: $scope.product, qty: $scope.quantity};
          $scope.loading = false;
          $scope.error = false;
          $scope.success = message;
          $scope.addedToCard = true;
          $timeout(function(){
            $scope.success = null;
          }, 2500);
        }, function(error){
          $scope.error = error || 'error.connexion_lost';
          $scope.loading = false;
        })
      ;
    };

    var serializedOptions = function(){
      var ret = {};

      angular.forEach($scope.options, function(option){
        angular.forEach(option.value, function(val) {
          if (val.active) {
            ret[option._code] = val._code;
          }
        })
      });

      return ret;
    };

    $scope.addQty = function(){
      $scope.quantity=($scope.quantity + ($scope.quantity < 40));
    };

    $scope.delQty = function(){
      $scope.quantity= ($scope.quantity - ($scope.quantity > 1));
    };

    $scope.getInfos = function(){
      $state.go($state.current.name + '.info', $stateParams);
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyOrdersCtrl
 * @description
 * # MyOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyOrdersCtrl', function ($scope, User, order, Utils) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.loading = true;
    $scope.orders = [];
    $scope.error = false;
    $scope.no_orders = false;
    $scope.title = 'myaccount.myorders.title';

    order.list().then(
      function (response){
        $scope.no_orders = false;
        $scope.loading = false;
        if (response.message && response.message.status === 'error') {
          if (response.message.logged_in === '0') {
            return User.goToLogin();
          }
          return $scope.error = response.message.text;
        }
        if (response.orders && response.orders.item) {
          return $scope.orders = Utils.arrayfy(response.orders.item);
        }
        $scope.no_orders = true;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );


  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:OrderRecapCtrl
 * @description
 * # OrderRecapCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('OrderRecapCtrl', function ($scope, $stateParams, User, order, $translate, Utils) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.loading    = true;
    $scope.order      = null;
    $scope.error      = false;
    $scope.title      = '';
    $translate('myaccount.order.title', {id: $stateParams.num}).then(function (translation) {
      $scope.title = translation;
    });
    $scope.Utils      = Utils;

    $scope.items      = [];
    $scope.totals     = [];

    $scope.formatAddress = Utils.formatAddress;

    order.get($stateParams.id).then(
      function (response){
        if (response.message && response.message.status === 'error') {
          if (response.message.logged_in === '0') {
            return User.goToLogin();
          }
          $scope.loading = false;
          return $scope.error = response.message.text;
        }
        if (response.order_details) {
          $scope.order = response.order_details;
          $scope.items = Utils.arrayfy($scope.order.ordered_items.item);
          $scope.ids = [];
          angular.forEach($scope.items, function(item){
            $scope.ids.push(item._product_id);
          });
          $scope.totals = [];
          angular.forEach($scope.order.totals, function(v) {
            if (v.summary) v = v.summary;
            $scope.totals.push({label: v._label, val: v.__text});
          });
          $scope.loading = false;
          return ;

        }
        $scope.error = 'error.connexion_lost';
        $scope.loading = false;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );

    $scope.sameAddresses = function(a,b) {
      if (a.entity_id.__text == b.entity_id.__text) {
        return true;
      }
      return a.city.__text == b.city.__text &&
        a.country.__text == b.country.__text &&
        a.country_id.__text == b.country_id.__text &&
        a.firstname.__text == b.firstname.__text &&
        a.lastname.__text == b.lastname.__text &&
        a.postcode.__text == b.postcode.__text &&
        a.street1.__text == b.street1.__text &&
        a.street.__text == b.street.__text &&
        a.telephone.__text == b.telephone.__text;
    }

  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.CurrentUser
 * @description
 * # CurrentUser
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('CurrentUser', function () {


    return {

    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.responseHandler
 * @description
 * # responseHandler
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('responseHandler', function ($q) {
    var success = function(response, callback){
      if (typeof response.data === 'object') {
        if (response.data.message && response.data.message.status == 'error') {
          return $q.reject(response.data.message.text);
        }
        if (typeof callback === 'function') {
          callback(response);
        }
        return response.data;
      } else {
        return $q.reject(response.data);
      }
    };

    var error = function(response) {
      $q.reject(response.data);
    };

    var handle = function($httpRequest){
      return $httpRequest.then(success, error);
    };

    return {
      success: success,
      error: error,
      handle: handle
    }
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.utils
 * @description
 * # utils
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('Utils', function ($state) {
    var slugify = function(str) {
      if (!str) return '';
      return str.toLowerCase()
        .replace('é', 'e')
        .replace('à', 'a')
        .replace('è', 'e')
        .replace('û', 'u')
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    };

    var isEmpty = function(obj) {

      if (obj == null) return true;

      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;

      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }

      return true;
    };

    var getTimestamp = function() {
      return Math.floor(Date.now() / 1000) | 0;
    };

    var arrayfy = function(val){
      return Array.isArray(val) ? val : [val];
    };

    var isIOS = function(){
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };

    var formatAddress = function(address){
      if (!address || !address.street || !address.postcode) {
        return 'cart.address.add'
      }
      window.address = address;
      var str = '';
      str += address.firstname + ' ' + address.lastname + '<br />';
      str += (address.street1?address.street1:address.street) + '<br />';
      str += address.postcode + ' ' + address.city + (address.region ? ' ' + address.region : '') + '<br />';
      str += address.telephone

      return str;
    };

    return {
      slugify:      slugify,
      isEmpty:      isEmpty,
      getTimestamp: getTimestamp,
      arrayfy:      arrayfy,
      isIOS:        isIOS,
      formatAddress:formatAddress
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.ApiLink
 * @description
 * # ApiLink
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('ApiLink', function (ENV, Lang) {
    var getLink = function(controller, action, additionalParams) {
      var add = '';
      if (additionalParams) {
        angular.forEach(additionalParams, function(val, key) {
          add += '/' + encodeURIComponent(key) + '/' + encodeURIComponent(val);
        });
      }
      var path = encodeURIComponent(controller) + '/' + encodeURIComponent(action);
      var scope = isOverridedPath(path) ? 'raaad_xmlconnect' : 'xmlconnect';
      return getApiBase() + '/' + scope + '/' + path + '/app_code/' + getAppCode() + add;
    };

    var getOverridedPaths = function(){
      return [
        'customer/token',
        'customer/facebooklogin',
        //'customer/orderdetails',
        'customer/info',
        'customer/updateopt',
        'customer/updateemail',
        'customer/updatename',
        'customer/updatepassword',

        //'cart/index',
        'cart/add',
        'cart/delete',
        'cart/update',

        'checkout/address',
        'checkout/saveorder',

        'address/save',
        'address/delete',

        'stripe/savedcards',

        'init/init'
      ];
    };

    var isOverridedPath = function(path){
      return getOverridedPaths().indexOf(path) != -1;
    };

    var getApiBase = function() {
      return ENV.apiEndpoint + '/' + Lang.get();
    };
    var getAppCode = function() {
      return encodeURIComponent(Lang.getAppCode());
    };

    return {
      'get': getLink,
      getApiBase: getApiBase,
      getAppCode: getAppCode
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Lang
 * @description
 * # Lang
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('Lang', function (ENV, $cookies, LocalStorage, $injector) {
    var allowedLang = 'fr us uk de'.split(' ');
    var currentLang = $cookies.get('lang') || ENV.defaultLang;
    var callbackStack = [];

    var getNewId = function (){
      switch (currentLang.toLowerCase()) {
        case 'de': return 771; break;
        case 'uk': return 445; break;
        case 'us': return 346; break;
        case 'fr':
        default:   return 408; break;
      }
    };

    var onChange = function(callback) {
      callbackStack.push(callback);
    };

    var execCallbackStack = function(newLang, oldLang){
      angular.forEach(callbackStack, function(callback){
        callback(newLang, oldLang);
      })
    };

    var getCurrentLang = function(){
      return currentLang;
    };

    var setCurrentLang = function(lang){
      var _current = currentLang;
      lang = lang.toLowerCase();

      LocalStorage.clear();
      for (var i = 0; i < allowedLang.length; i++) {
        if (allowedLang[i] === lang.toLowerCase()) {
          currentLang = lang;
          break;
        }
      }

      $injector.get('Configuration').reload();
      execCallbackStack(_current, currentLang);
      return currentLang;
    };

    var getAppCode = function() {
      switch (currentLang) {
        case 'de': return 'de_iph4'; break;
        case 'uk': return 'en_iph2'; break;
        case 'us': return 'en_iph3'; break;
        default:   return 'fr_iph1'; break;
      }
    };

    var getCurrency = function(){
      switch (currentLang) {
        case 'us':
          return 'USD';
          break;
        case 'uk':
          return 'GBP';
          break;
        case 'fr':
        case 'de':
        default:
          return 'EUR';
          break;
      }
    };

    return {
      'get': getCurrentLang,
      'set': setCurrentLang,
      getCurrency: getCurrency,
      getAppCode:  getAppCode,
      onChange:   onChange,
      getNewId: getNewId
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.MagentoPostRequest
 * @description
 * # MagentoPostRequest
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('MagentoPostRequest', function ($http, $httpParamSerializer) {

    return function(url, data, token) {
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      if (token) {
        headers.Authorization = 'token="' + token + '"';
      }

      return $http({
        method: 'POST',
        url: url,
        headers: headers,
        data: $httpParamSerializer(data)
      });
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.User
 * @description
 * # User
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('User', function (Configuration, $http, ApiLink, MagentoPostRequest, $cookies, responseHandler, $q, LocalStorage, $location, $state, Lang, $injector, $stateParams) {
    var cookieKey = '_token_user';
    var _token = null;
    var _anonymous;

    var goToLogin = function(backPath) {
      setBackPath(backPath);
      $state.go('app.auth-register');
    };

    var setBackPath = function(backPath){
      if (!backPath) {
        backPath = '/#/' + $stateParams.store;
      }
      $cookies.remove('login/backpath');
      $cookies.put('login/backpath', backPath, 60 * 60 * 24);
    };

    var getBackPath = function(a){
      var backPath = $cookies.get('login/backpath');
      //console.log('backPathFromCookie', backPath);
      if (!backPath) {
        backPath = '/#/' + $stateParams.store;
      }
      else {
        if (!a)
        $cookies.remove('login/backpath');
      }
      //console.log('backPath', backPath);
      return backPath;
    };

    var setToken = function(token, anonymous) {
      if (!anonymous || anonymous === undefined) {
        anonymous = 0;
      }
      _token = token;
      setAnonymous(anonymous);
      if (token) {
        $cookies.put(cookieKey, token);
        $http.defaults.headers.common.Authorization = 'token="' + token + '"';
      }
      else {
        $cookies.remove(cookieKey);
        $cookies.remove(cookieKey + '_anonymous');
        delete $http.defaults.headers.common.Authorization;
      }
    };

    var setAnonymous = function(val) {
      _anonymous = !!val;
      $cookies.remove(cookieKey + '_anonymous');
      $cookies.put(cookieKey + '_anonymous', val);
    };

    var isLoggued = function(){
      return !_anonymous;
    };

    var _magentoPostRequestSuccess = function(response) {
      return responseHandler.success(response, function(response) {
        if (response.data.message.token) {
          setToken(response.data.message.token);
        }
      });
    };

    var login = function(user, pass){
      return MagentoPostRequest(ApiLink.get('customer', 'login'), {username: user, password: pass}, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var facebookLogin = function(code){
      if (!!(!code && (navigator.userAgent.match('CriOS') || window.devmode))){
        return $q(function(){
          var uri = encodeURIComponent(location.href.split('#')[0] + '#' + $location.path());
          var url = 'https://www.facebook.com/dialog/oauth?client_id=406695926021804&redirect_uri=' + uri + '&scope=email,user_birthday';
          $cookies.put('FBURIBACK', uri);
          try {
            var win = window.open(url, '_blank');
            win.focus();
            //window.open(url);
          }
          catch (e) {
            alert('Please use Safari for facebook login' + "\n" + 'Merci d\'utiliser Safari pour vous connecter');
          }
          //location.href = url;
        });
      }
      if (code) {
        var data = {code: code, is_subscribed: 1, uri: $cookies.get('FBURIBACK')};
        return $q(function (resolve, reject) {
          MagentoPostRequest(ApiLink.get('customer', 'facebooklogin'), data, _token)
            .then(function (response) {
              if (response.data.message.status == 'error') {
                reject(response.data.message.text);
              }
              _magentoPostRequestSuccess(response);
              return resolve(response);
            }, function () {
              return reject('error.connexion_lost');
            })
        });
      }
      return $q(function(resolve, reject){
        FB.login(function(response) {
          if (response.authResponse) {
            var data = {accesstoken: response.authResponse.accessToken, is_subscribed: 1};
            return MagentoPostRequest(ApiLink.get('customer', 'facebooklogin'), data, _token)
              .then(function(response){
                if (response.data.message.status == 'error'){
                  reject(response.data.message.text);
                }
                _magentoPostRequestSuccess(response);
                return resolve(response);
              }, function(){
                return reject('error.connexion_lost');
              });
          } else {
            return reject('error.facebook_canceled');
          }
        }, {scope: 'email,user_birthday'});
      });
    };

    var save = function(data){
      return MagentoPostRequest(ApiLink.get('customer', 'save'), data, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var getToken = function(requiredAndAsynchronousToken){
      if (requiredAndAsynchronousToken) {
        return $q(function(resolve, reject){
          if (_token) {
            return resolve(_token + '');
          }
          return $http
            .get(ApiLink.get('customer', 'token'))
            .then(function(response){
              if (response.data.message) {
                setToken(response.data.message.token, 1);
                return resolve(response.data.message.token);
              }
              reject(null);
            }, function(){
              return reject(null);
            })
          ;
        });
      }
      return (_token || '') + '';
    };

    var forgotPassword = function(email){
      return MagentoPostRequest(ApiLink.get('customer', 'forgotpassword'), {email: email}, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var logout = function(){
      setToken(null, 1);
      $injector.get('Cart').reload();
      return $http({
        method: 'GET',
        url: ApiLink.get('customer', 'logout'),
        headers: {
          'Authorization': 'token="' + _token + '"'
        }
      })
        .then(function(){
          setToken(null, 1);
        })
      ;
    };

    var getInfos = function(forceRefresh){
      return $q(function(resolve, reject){
        var ret = LocalStorage.getObject('customer/info');
        if (ret && !forceRefresh) {
          return resolve(ret);
        }
        return $http({
          method: 'GET',
          url: ApiLink.get('customer', 'info'),
          headers: {
            'Authorization': 'token="' + _token + '"'
          }
        })
          .then(function(response){
            if (response.data.customer) {
              ret = response.data.customer;
              LocalStorage.putObject('customer/info', ret);
              return resolve(ret);
            }
            if (response.data.message && response.data.message.logged_in === '0') {
              return goToLogin();
            }
            return reject('error.unknown_reason');
          }, function(){
            return reject('error.connexion_lost');
          })
      });
    };

    var updateNewsletter = function(val){
      return $q(function(resolve){
        MagentoPostRequest(
          ApiLink.get('customer', 'updateopt'),
          { subscribe: val ? 1 : 0 },
          _token
        ).then(function(){
            resolve();
          }, function(){
            resolve();
          })
      });
    };

    var updater = function(data, part){
      return $q(function(resolve, reject){
        MagentoPostRequest(
          ApiLink.get('customer', 'update' + part),
          data,
          _token
        ).then(function(response){
            if (response.data.message && response.data.message.status) {
              if (response.data.message.status == 'success') {
                return resolve(response.data.message.text);
              }
              return reject(response.data.message.text);
            }
            return reject('error.unknown_reason');
          }, function(){
            reject('error.connexion_lost');
          })
      });
    };

    var updateEmail = function(email, pass){
      return updater({ password: pass, email: email}, 'email');
    };

    var updateName = function(first, last){
      return updater({ firstname: first, lastname: last}, 'name');
    };

    var updatePassword = function(current, newPass){
      return updater({ password: current, update: newPass}, 'password');
    };

    var tmpValAno = parseInt($cookies.get(cookieKey + '_anonymous'));
    setToken($cookies.get(cookieKey) || null, isNaN(tmpValAno) ? 1 : tmpValAno);


    return {
      login:              login,
      logout:             logout,
      register:           save,
      forgotPassword:     forgotPassword,

      getToken:           getToken,
      isLoggued:          isLoggued,
      goToLogin:          goToLogin,
      getBackPath:        getBackPath,
      setBackPath:        setBackPath,

      getInfos:           getInfos,
      updateNewsletter:   updateNewsletter,
      updateEmail:        updateEmail,
      updateName:         updateName,
      updatePassword:     updatePassword,

      facebookAuth:       facebookLogin
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.order
 * @description
 * # order
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('order', function (User, $http, responseHandler, ApiLink) {
    var listOrders = function() {
      return responseHandler.handle(
        $http({
          method: 'GET',
          url: ApiLink.get('customer', 'orderlist')
        })
      );
    };

    var getOrder = function(id) {
      return responseHandler.handle(
        $http({
          method: 'GET',
          url: ApiLink.get('customer', 'orderdetails', {order_id: id})
        })
      );
    };

    return {
      list:   listOrders,
      'get':  getOrder
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Product
 * @description
 * # Product
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Product', function ($http, responseHandler, ApiLink, LocalStorage, $q, MagentoPostRequest, Utils) {
    var _get = function(id) {
      return $q(function(resolve, reject) {
        var key = 'catalog/product/' + id;
        var ret = LocalStorage.getObject(key);
        if (ret) {
          return resolve(ret);
        }

        responseHandler
          .handle($http({
            method: 'GET',
            url: ApiLink.get('catalog', 'product', {id: id})
          }))
          .then(function(response) {
            if (response.product && response.product.name) {
              LocalStorage.putObject(key, response.product, 60 * 5);
              return resolve(response.product);
            }
            return reject('error.unknown_reason');
          }, function() {
            return reject('error.connexion_lost');
          });
      });
    };

    var search = function(term, page){
      var count, offset;
      if (page < 1) {
        count = 6;
        offset = 0;
      }
      else {
        count = 20;
        offset = (page - 1) * 20 + 6;
      }

      return $q(function(resolve, reject){
        MagentoPostRequest(
          ApiLink.get('catalog', 'search', {count: count, offset: offset}),
          {query: term}
        ).then(function(response){
            if (response.data.search && response.data.search.products) {
              return resolve(Utils.arrayfy(response.data.search.products.item));
            }
            if (response.data.search) {
              return resolve([]);
            }
            return reject('error.unknown_reason');
          },
          function(){
            return reject('error.connexion_lost');
          })
      });
    };

    return {
      'get':  _get,
      search: search
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.MenuCategories
 * @description
 * # MenuCategories
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('MenuCategories', function ($http, $q, LocalStorage, ApiLink) {
    var cookieKey = 'MenuCategories';
    var lifeTime = 60 * 60;
    var _categories = null;

    var getTimestamp = function() {
      return Math.floor(Date.now() / 1000) | 0;
    };

    var getCookieValue = function() {
      var value = LocalStorage.getObject(cookieKey + '_val');
      if (value) {
        var time = parseInt(LocalStorage.get(cookieKey + '_time'));
        if (time < getTimestamp()) {
          LocalStorage.remove(cookieKey + '_val');
        }
        else {
          _categories = value;
          return value;
        }
      }
      return null;
    };

    var clearVal = function(val) {
      var tmp = {};
      angular.forEach(val.category, function(category,idx){
        tmp[idx+'-'+category.entity_id] = {n:category.name, c: {}};
        if (category.children) {
          angular.forEach(category.children.category, function(child,idx2){
            tmp[idx+'-'+category.entity_id]['c'][idx2+'-'+child.entity_id] = child.name;
          });
        }
      });
      return tmp;
    };

    var setCookieValue = function(val) {
      val = clearVal(val);
      _categories = val;
      LocalStorage.putObject(cookieKey + '_val', val);
      LocalStorage.put(cookieKey + '_time', getTimestamp() + lifeTime);
      return val;
    };

    var getCategories = function(){
      return $q(function(resolve, reject) {
        var categories = getCookieValue();

        if (categories) {
          return resolve(categories);
        }

        $http
          .get(ApiLink.getApiBase() + '/raaad_xmlconnect/index/index/app_code/' + ApiLink.getAppCode() + '/level/3')
          .then(function(response) {
            if (response.data
                && response.data.home
                && response.data.home.categorytree) {
              categories = response.data.home.categorytree;
              resolve(setCookieValue(categories));
            }
            else {
              reject(null);
            }
          }, function() {
            reject(null);
          })
        ;
      });
    };

    // Public API here
    return function() {
      return getCategories();
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.category
 * @description
 * # category
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Category', function ($http, responseHandler, ApiLink, LocalStorage, $q) {
    var _get = function(id, page) {
      return $q(function(resolve, reject) {
        var key = 'catalog/category/' + id + '-' + page;
        var ret = LocalStorage.getObject(key);
        if (ret) {
          return resolve(ret);
        }

        var count, offset;
        if (page < 1) {
          count = 6;
          offset = 0;
        }
        else {
          count = 20;
          offset = (page - 1) * 20 + 6;
        }

        responseHandler
          .handle($http({
            method: 'GET',
            url: ApiLink.get('catalog', 'category', {id: id, count: count, offset: offset})
          }))
          .then(function(response) {
            if (response.category) {
              LocalStorage.putObject(key, response.category, 60 * 5);
              return resolve(response.category);
            }
            reject(null);
          }, function() {
            reject(null);
          });
      });
    };

    return {
      'get': _get
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:splashScreen
 * @description
 * # splashScreen
 */
angular.module('angularApp')
  .directive('splashScreen', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        angular.element(document).ready(function(){
          $timeout(function(){
            element.remove();
          }, 500);
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:loader
 * @description
 * # loader
 */
angular.module('angularApp')
  .directive('loader', function () {
    return {
      template: '<div class="loader-directive"><div class="loader"></div></div>',
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cartFooter
 * @description
 * # cartFooter
 */
angular.module('angularApp')
  .directive('cartFooter', function (Cart) {

    return {
      templateUrl: 'views/directives/cart-footer.html',
      restrict: 'E',
      link: function postLink(scope) {
        var body = angular.element('body');

        //scope.cart = Cart;
        //scope.nb_product = Cart.getNbProduct(true);
        var updateNbProduct = function() {
          scope.nb_product = Cart.getNbProduct(true);

          if (scope.nb_product) {
            body.addClass('has-cart-footer');
          }
          else {
            body.removeClass('has-cart-footer');
          }
        };
        updateNbProduct();
        Cart.notifyUpdate(updateNbProduct);
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuTop
 * @description
 * # menuTop
 */
angular.module('angularApp')
  .directive('menuTop', function ($http, MenuCategories, Utils, $timeout, $state, $translate, Lang, Configuration) {
    return {
      templateUrl: 'views/directives/menutop.html',
      restrict: 'E',
      scope:{
        disabledCartFooter: '@',
        menuTitle: '=?',
        backEnabled: '@',
        error: '=?',
        info: '=?',
        product: '@'
      },
      link: function postLink(scope) {
        var timer = null;
        scope.Utils = Utils;
        scope.categories = null;
        scope.disabledCartFooter = scope.disabledCartFooter == 1;
        scope.product = scope.product == 1;
        scope.banner = {text: ''};
        scope.android_enabled = 0;

        var menu = null;
        scope.toggleMenuState = function() {
          menu = menu || angular.element('#menu-dropdown');
          menu.toggleClass('menu-open');
          angular.element('body').toggleClass('menu-top-open');
        };

        scope.enableScroll = function() {
          angular.element('body').removeClass('menu-top-open');
        };

        scope.$watch('menuTitle', function(menuTitle) {
          if (menuTitle === 'global.loading' || menuTitle === undefined) {
            return ;
          }

          $translate(menuTitle).then(function (titleTranslated) {
            angular.element(window.document)[0].title = 'Rad.co | ' + titleTranslated;
          }, function (titleTranslated) {
            angular.element(window.document)[0].title = 'Rad.co | ' + titleTranslated;
          });
        });

        scope.$watch('error', function(val){
          if (!val && timer && timer.cancel){
            timer.cancel(function(){
              timer = null;
            });
          }
          else if (val) {
            timer = $timeout(function(){
              timer = null;
              scope.error = null;
            }, 5000);
          }
          else {
            timer = null;
          }
        });

        var updateConfig = function(cfg){
          var style = '';
          if (cfg.banner_font_color) {
            style += 'color:'+cfg.banner_font_color+';';
          }
          if (cfg.banner_background_color) {
            style += 'background-color:'+cfg.banner_background_color+';';
          }
          scope.banner = {
            text:       cfg.banner_text,
            style:      style
          };

          //if (cfg.smart_banner_android) {
            scope.android_enabled = 0; //cfg.smart_banner_android == 1;
          //}
        };

        scope.getCategoryId = function(idx) {
          return parseInt(idx.split('-')[1]);
        };

        var updateCategories = function(){
          MenuCategories().then(function(categories) {
            scope.categories = categories;
          });
          scope.newCategoryId = Lang.getNewId();

          Configuration.reload(updateConfig);
          if (Configuration.done()) {
            updateConfig(Configuration.data());
          }
        };
        updateCategories();
        Lang.onChange(updateCategories);

        scope.goBack = function(){
          if (
            $state.$current.name == 'app.cart.confirm' ||
            $state.$current.name == 'app.my-account.free-orders' ||
            $state.$current.name == 'app.my-account.addresses'
          )
          {
            return $state.go('app.store');
          }


          var currentState = $state.$current.name;
          if (currentState.indexOf('app.cart') != -1) {
            var goTo = null;
            switch (currentState) {
              case 'app.cart':
              case 'app.cart.success':
                goTo = 'app.store';
                break;
              case 'app.cart.payment':
              case 'app.cart.payment.add':
              //goTo = 'app.cart.delivery';
              //break;
              case 'app.cart.edit':
              case 'app.cart.delivery':
              case 'app.cart.delivery.new':
              case 'app.cart.billing':
              case 'app.cart.billing.new':
              case 'app.auth-register':
                goTo = 'app.cart';
                break;
              default: break;
            }
            if (goTo) {
              return $state.go(goTo);
            }
          }

          try {
            //if (history.length) {
            //  return history.go(-1);
            //}
            $state.go($state.$current.parent.name == 'app'  ? $state.$current.name.split('.').slice(0,-1).join('.') : '^');
          } catch (e) {
            $state.go('app.store');
          }
        };
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:menuLeftBtn
 * @description
 * # menuLeftBtn
 */
angular.module('angularApp')
  .directive('menuLeftBtn', function (User, $rootScope, Cart, Lang) {
    var html = angular.element('html');
    $rootScope.$on('$routeChangeStart', function () {
      html.removeClass('left-open');
    });

    return {
      templateUrl: 'views/directives/menuleftbtn.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.nbProduct = null;
        scope.Lang = Lang;
        scope.User = User;
        element
          .find('.left-menu-opener')
          .click(function (e) {
            e.preventDefault();
            if (scope.nbProduct === null) {
              Cart.getNbProduct().then(function(val){
                scope.nbProduct = val;
              });
            }
            html.toggleClass('left-open');
          })
        ;

        angular.element('[data-close-menu-left] a').click(function(){
          html.toggleClass('left-open');
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.localStorage
 * @description
 * # localStorage
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('LocalStorage', function (Utils) {
    var lS = window.localStorage;
    var lifeTime = 60 * 10;

    var _get = function(key) {
      var time = parseInt(lS.getItem(key + '_time'));
      if (time < Utils.getTimestamp()) {
        remove(key);
        return null;
      }

      return lS.getItem(key);
    };

    var put = function(key, obj, lifeT){
      try {
        lifeT = lifeT || lifeTime;
        lS.setItem(key + '_time', Utils.getTimestamp() + lifeT);
        lS.setItem(key, obj);
      } catch (e) {
        clear();
      }
    };

    var getObject = function(key) {
      var ret = _get(key);
      if (ret) {
        try {
          return JSON.parse(ret);
        } catch (e) {
          ret = null;
        }
      }
      return ret;
    };

    var putObject = function(key, obj, lifeT){
      lifeT = lifeT || lifeTime;
      put(key, JSON.stringify(obj), lifeT);
    };

    var clear = function() {
      lS.clear();
    };

    var remove = function(key) {
      lS.removeItem(key + '_time');
      lS.removeItem(key);
    };


    return {
      'get': _get,
      'put': put,
      'getObject': getObject,
      'putObject': putObject,
      'clear': clear,
      'remove': remove
    }
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cart
 * @description
 * # Cart
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cart', function (User, $q, ApiLink, $http, MagentoPostRequest, LocalStorage, Utils, Configuration) {
    var _cartDetails = LocalStorage.getObject('checkout/orderreview');
    var queueNotify = [];

    var setDetails = function(val){
      _cartDetails = val;
      LocalStorage.putObject('checkout/orderreview', val);
      _sendUpdateNotif();
      return _cartDetails;
    };

    var _sendUpdateNotif = function(){
      angular.forEach(queueNotify, function(callback){
        callback();
      });
    };

    var notifyUpdate = function(callback){
      queueNotify.push(callback);
    };

    var isInit = function(){
      return _cartDetails !== null;
    };

    var getDetails = function(forceReload){
      return $q(function(resolve, reject){
        if (forceReload === true || _cartDetails === null) {
          return reload(false).then(function(){
            resolve(_cartDetails);
          }, function(error){
            reject(error);
          });
        }
        return resolve(_cartDetails);
      });
    };

    var getCartDetails = function(){
      return $q(function(resolve, reject){
        User
          .getToken(true)
          .then(function() {
            return $http({
              url: ApiLink.get('cart', 'index'),
              method: 'GET',
              headers: {
                'Authorization': 'token="' + User.getToken() + '"'
              }
            })
              .then(function(response) {
                if (response.data.order && response.data.order) {
                  setDetails(response.data.order);
                  return resolve(response.data.order);
                }
                return reject(null);
              }, function(){
                return reject(null);
              })
              ;
          }, function() {
            return reject(null);
          }
        );
      });
    };

    var getFormattedDetails = function() {
      var ret = {
        groups: [],
        items: [],
        totals: _cartDetails && _cartDetails.totals || {},
        empty: !_cartDetails || !_cartDetails.products,
        colis: 0,
        date: _cartDetails && _cartDetails.deliverytime ? _cartDetails.deliverytime.estimation : null,
        id: null,
        email: null,
      };

      ret.email = _cartDetails.email;
      ret.id = _cartDetails.id;
      if (!ret.empty) {
        angular.forEach(Utils.arrayfy(_cartDetails.products.group), function (group) {
          ret.colis++;
          var gr = [];
          angular.forEach(Utils.arrayfy(group.items.item), function (item) {
            item.options.option = Utils.arrayfy(item.options.option);
            gr.push(item);
            ret.items.push(item);
          });

          ret.groups.push(gr);
        });
      }
      return ret;
    };

    var reload = function(loginRequired){
      return $q(function(resolve, reject){
        //User
        //.getToken(true)
        //.then(function() {
        //console.log('Token = ', User.getToken());
        return $http(
          {
            url: ApiLink.get('checkout', 'orderreview'),
            method: 'GET',
            headers: {
              'Authorization': 'token="' + User.getToken() + '"'
            }
          })
          .then(function(response) {
            if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
              if (response.data.message.logged_in == 0 && loginRequired) {
                User.logout();
                return reject(User.goToLogin());
              }
            }
            if (response.data.order && response.data.order) {
              setDetails(response.data.order);
              return resolve(response.data.order);
            }
            return reject(null);
          }, function(){
            return reject(null);
          })
          ;
        //}, function() {
        //  return reject(null);
        //}
        //);
      });
    };

    var addCoupon = function(coupon){
      return $q(function(resolve, reject){
          User
            .getToken(true)
            .then(function() {
              var data = coupon ? {coupon_code: coupon} : {remove: 1};
              return MagentoPostRequest(
                ApiLink.get('cart', 'coupon'),
                data,
                User.getToken()
              )
                .then(function(response) {
                  if (response.data.order && response.data.order.message && response.data.order.message.status != 'success') {
                    return reject(response.data.order.message.text);
                  }
                  if (response.data.message && response.data.message.status != 'success') {
                    return reject(response.data.message.text);
                  }
                  if (response.data.message && response.data.message.status == 'success') {
                    return resolve(response.data.message.text);
                  }
                  return reject('error.unknown_reason');
                }, function(){
                  return reject('error.connexion_lost');
                })
                ;
            }, function() {
              return reject('error.connexion_lost');
            }
          );
      });
    };

    var addProduct = function(prodId, qty, opts) {
      return $q(function(resolve, reject) {
        User
          .getToken(true)
          .then(function(){
            var data = angular.copy(opts);
            data.product = prodId;
            data.qty = qty;
            MagentoPostRequest(
              ApiLink.get('cart', 'add'),
              data,
              User.getToken()
            )
              .then(function(response) {
                if (response.data.order && response.data.order.message  && response.data.order.message.text) {
                  if (response.data.order.message.status != 'success') {
                    return reject(response.data.order.message.text);
                  }
                  else {
                    _sendUpdateNotif();
                    setDetails(response.data.order);
                    return resolve(response.data.order.message.text);
                  }
                }
                else if (response.data.message) {
                  return reject(response.data.message.text);
                }
                return reject('error.unknown_reason');
              }, function(){
                return reject('error.connexion_lost');
              })
            ;
          });
      });
    };

    var getNbProduct = function(fromCache){
      var value = function() {
        var nb = 0;
        var details = getFormattedDetails();
        if (details.empty) {
          return 0;
        }
        angular.forEach(Utils.arrayfy(details.items), function(item) {
          nb += parseInt(item.qty);
        });

        return nb;
      };
      if (isInit() && fromCache) {
        return value();
      }
      if (fromCache) {
        return null;
      }
      return $q(function(resolve, reject){
        getDetails().then(function(){
          return resolve(value());
        }, function(){
          return reject('error.connexion_lost');
        });
      });
    };

    var clear = function(){
      LocalStorage.putObject(_cartDetails, {}, 0);
    };

    var pay = function(data){
      return $q(function(resolve, reject){
        return MagentoPostRequest(ApiLink.get('checkout', 'saveorder'), data, User.getToken())
          .then(function(response){
            if (response.data.message && response.data.message.status && response.data.message.status == 'success') {
              clear();
              reload();
              return resolve({id:response.data.message.order_id, increment_id: response.data.message.number});
            }
            return reject(response.data.message.text);
          }, function(){
            reject('error.connexion_lost');
          })
        ;
      });
    };

    var updateQty = function(item_id, qty) {
      return $q(function(resolve, reject) {
        var data = {};
        data['cart[' + item_id +'][qty]'] = qty;
        return MagentoPostRequest(ApiLink.get('cart', 'update'), data, User.getToken())
          .then(function(response) {
            if (response.data.order && response.data.order.message  && response.data.order.message.text) {
              if (response.data.order.message.status != 'success') {
                return reject(response.data.order.message.text);
              }
              else {
                setDetails(response.data.order);
                return resolve(response.data.order.message.text);
              }
            }
            else if (response.data.message) {
              return reject(response.data.message.text);
            }
            return reject('error.unknown_reason');
          }, function(){
            return reject('error.connexion_lost');
          })
      });

    };

    var removeItem = function(id){
      return $q(function(resolve, reject) {
        return MagentoPostRequest(ApiLink.get('cart', 'delete'), {item_id: id}, User.getToken())
          .then(function(response) {
            if (response.data.order && response.data.order.message  && response.data.order.message.text) {
              if (response.data.order.message.status != 'success') {
                return reject(response.data.order.message.text);
              }
              else {
                setDetails(response.data.order);
                return resolve(response.data.order.message.text);
              }
            }
            else if (response.data.message) {
              return reject(response.data.message.text);
            }
            return reject('error.unknown_reason');
          }, function(){
            return reject('error.connexion_lost');
          })
      });
    };

    return {
      init:         reload,
      reload:       reload,
      addProduct:   addProduct,
      getNbProduct: getNbProduct,
      getCartDetails:getCartDetails,
      getDetails:   getDetails,
      addCoupon:    addCoupon,
      isInit:       isInit,
      notifyUpdate: notifyUpdate,
      getFormattedDetails: getFormattedDetails,
      pay:          pay,
      clear:        clear,
      updateQty:    updateQty,
      removeItem:   removeItem
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCtrl', function ($scope, Cart, User, $state, LocalStorage) {
    //if (!User.isLoggued()) {
      //return User.goToLogin($state.href('cart'));
    //}
    if (LocalStorage.get('go_detail_cart')) {
      $state.go('app.cart.confirm');
    }
    return $state.go('app.cart.confirm');

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.error      = false;
    //$scope.info       = 'cart.reloading';

    var setViewData = function(cartDetails){
      cartDetails.then(function(){
        $scope.ids = [];

        angular.forEach(Cart.getFormattedDetails().items, function(item){
          $scope.ids.push(item.entity_id);
        });
        if ($scope.ids.length == 1) {
          $scope.ids = $scope.ids[0];
        }
        else if (!$scope.ids.length) {
          $scope.ids = '';
        }

        $scope.details = Cart.getFormattedDetails();
      });
    };

    setViewData(Cart.getDetails());

    Cart
      .reload(true)
      .then(function(){
        $scope.loading  = false;
        $scope.error    = null;
        $scope.info     = null;
        setViewData(Cart.getDetails());
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartDeliveryAddressListCtrl
 * @description
 * # CartDeliveryAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartDeliveryAddressListCtrl', function ($scope, User, Address, $state, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart.delivery'));
    }

    var currentState = $state.$current.name;
    $scope.title = 'cart.delivery.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses(true)
      .then(function(addresses){
        $scope.loading = false;
        if ((!addresses || !addresses.length) && $state.$current.name == currentState) {
          return $state.go('app.cart.delivery.new');
        }
        $scope.addresses = addresses;

      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.useAddress = function(address) {
      $scope.masterLoading = true;
      $scope.error = null;

      Address.add({
        'shipping[use_for_billing]': 1,
        'shipping_address_id': address.entity_id
      })
        .then(function(response){
          if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
            if (response.data.message.logged_in == 0) {
              User.logout();
              return User.goToLogin();
            }
          }
          if (response.data.message && response.data.message.status == 'success') {
            //return $state.go('app.cart.confirm');
            return $state.go('app.cart.payment');
            //return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
          }
          $scope.masterLoading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.masterLoading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Address
 * @description
 * # Address
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Address', function ($http, $q, ApiLink, LocalStorage, User, MagentoPostRequest, Utils, Configuration) {
    var cacheKey = 'checkout/address';

    var getAddresses = function (forceReload) {
      return $q(function (resolve, reject) {
        var ret = LocalStorage.getObject(cacheKey);
        if (ret && forceReload !== true) {
          return resolve(ret);
        }
        $http({
          method: 'GET',
          url: ApiLink.get('checkout', 'address'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        })
          .then(function (response) {
            if (response.data.message) {
              return reject(response.data.message.text);
            }
            if (response.data.addresses == '') {
              return resolve([]);
            }
            if (response.data.addresses) {
              ret = [];
              if (response.data.addresses.item) {
                ret = Utils.arrayfy(response.data.addresses.item);
              }
              LocalStorage.putObject(cacheKey, ret, 600);
              return resolve(ret);
            }
            return reject('error.connexion_lost');
          }, function () {
            return reject('error.connexion_lost');
          })
        ;
      })
    };

    var add = function (data, isBilling) {
      return MagentoPostRequest(
        ApiLink.get('checkout', isBilling ? 'savebillingaddress' : 'saveshippingaddress'),
        data,
        User.getToken()
      );
    };

    var edit = function(data){
      return $q(function(resolve, reject){
        return MagentoPostRequest(
          ApiLink.get('address', 'save'),
          data,
          User.getToken()
        ).then(function(response){
            if (response.data.message && response.data.message.status) {
              if (response.data.message.status == 'success') {
                return resolve(response.data.message.text);
              }
              return reject(response.data.message.text);
            }
            return reject('error.unknown_reason');
          }, function(){
            reject('error.connexion_lost');
          });
      });
    };

    var _delete = function(id){
      return $q(function(resolve){
        return MagentoPostRequest(
          ApiLink.get('address', 'delete'),
          {id: id},
          User.getToken()
        ).then(function(){
            resolve();
          }, function(){
            resolve();
          });
      });

    };

    return {
      getAddresses: getAddresses,
      add:          add,
      edit:         edit,
      'delete':     _delete
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateDeliveryAddressCtrl
 * @description
 * # CartCreateDeliveryAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateDeliveryAddressCtrl', function ($scope, Address, User, $state, Lang) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart.delivery'))
    }
    $scope.title = 'cart.delivery.title';
    $scope.loading = false;

    $scope.use_for_billing = true;
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;

    $scope.validUpdate = function(val) {
      $scope.validPhone = val;
    };

    $scope.submitForm = function(){
      if (!$scope.firstname) {
        return $scope.error = 'error.empty.firstname';
      }
      if (!$scope.lastname) {
        return $scope.error = 'error.empty.lastname';
      }
      if (!$scope.street) {
        return $scope.error = 'error.empty.street';
      }
      if (!$scope.city) {
        return $scope.error = 'error.empty.city';
      }
      if (!$scope.postcode) {
        return $scope.error = 'error.empty.postcode';
      }

      if (!$scope.validPhone) {
        return $scope.error = 'error.phone_number';
      }

      $scope.error = null;

      if (!$scope.validPhone) {
        $scope.error = 'error.phone_number';
        return ;
      }

      $scope.loading = true;

      Address.add({
        'shipping[use_for_billing]': $scope.use_for_billing ? 1 : 0,
        'shipping[firstname]': $scope.firstname,
        'shipping[lastname]': $scope.lastname,
        'shipping[street][0]': $scope.street,
        'shipping[street][1]': $scope.street1,
        'shipping[city]': $scope.city,
        'shipping[postcode]': $scope.postcode,
        'shipping[telephone]': $scope.telephone,
        'shipping[save_in_address_book]': 1,
        'shipping[region_id]': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'shipping[country_id]': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country)
      })
        .then(function(response){
          if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
            if (response.data.message.logged_in == 0) {
              User.logout();
              return User.goToLogin();
            }
          }
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.payment');
            //return $state.go('app.cart.confirm');
            //if ($scope.use_for_billing) {
            //  return $state.go('app.cart.payment');
            //}
            //return $state.go('app.cart.billing');
          }
          $scope.loading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartCreateBillingAddressCtrl
 * @description
 * # CartCreateBillingAddressCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartCreateBillingAddressCtrl', function ($scope, Address, User, $state, LocalStorage, Lang) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart.delivery'))
    }
    $scope.title = 'cart.billing.title';
    $scope.loading = false;

    $scope.use_for_billing = true;
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;

    $scope.validUpdate = function(val) {
      $scope.validPhone = val;
    };


    $scope.submitForm = function(){
      if (!$scope.firstname) {
        return $scope.error = 'error.empty.firstname';
      }
      if (!$scope.lastname) {
        return $scope.error = 'error.empty.lastname';
      }
      if (!$scope.street) {
        return $scope.error = 'error.empty.street';
      }
      if (!$scope.city) {
        return $scope.error = 'error.empty.city';
      }
      if (!$scope.postcode) {
        return $scope.error = 'error.empty.postcode';
      }

      if (!$scope.validPhone) {
        return $scope.error = 'error.phone_number';
      }

      $scope.error = null;

      if (!$scope.validPhone) {
        $scope.error = 'error.phone_number';
        return ;
      }

      $scope.loading = true;

      Address.add({
        'billing[firstname]': $scope.firstname,
        'billing[lastname]': $scope.lastname,
        'billing[street][0]': $scope.street,
        'billing[street][1]': $scope.street1,
        'billing[city]': $scope.city,
        'billing[postcode]': $scope.postcode,
        'billing[telephone]': $scope.telephone,
        'billing[region_id]': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'billing[country_id]': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country),
        'billing[save_in_address_book]': 1
      }, true)
        .then(function(response){
          if (response.data.message && response.data.message.status && response.data.message.status == 'error') {
            if (response.data.message.logged_in == 0) {
              User.logout();
              return User.goToLogin();
            }
          }
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.confirm');
            //return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
          }
          $scope.loading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartBillingAddressListCtrl
 * @description
 * # CartBillingAddressListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartBillingAddressListCtrl', function ($scope, User, Address, $state, LocalStorage) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
    }

    $scope.title = 'cart.billing.title';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses()
      .then(function(addresses){
        $scope.loading = false;
        $scope.addresses = addresses;
        if (!addresses || !addresses.length) {
          return $state.go('app.cart.billing.new');
        }
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.useAddress = function(address) {
      $scope.masterLoading = true;
      $scope.error = null;

      Address.add({
        'billing_address_id': address.entity_id,
        'billing[use_for_billing]': '',
        'billing[firstname]': '',
        'billing[lastname]': '',
        'billing[street][0]': '',
        'billing[street][1]': '',
        'billing[city]': '',
        'billing[postcode]': '',
        'billing[telephone]': '',
        'billing[save_in_address_book]': 1,
        'billing[region_id]': '',
        'billing[country_id]': ''
      }, true)
        .then(function(response){
          if (response.data.message && response.data.message.status == 'success') {
            return $state.go('app.cart.confirm');
            //return $state.go('app.cart.' + (LocalStorage.get('go_detail_cart') ? 'confirm' : 'payment'));
          }
          $scope.masterLoading = false;
          $scope.error = response.data.message.text || 'error.unknown_reason';
        }, function(){
          $scope.masterLoading = false;
          $scope.error = 'error.connexion_lost';
        })
      ;

      return false;
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentListCtrl
 * @description
 * # CartPaymentListCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentListCtrl', function ($scope, User, Cart, SavedCards, $state, $cookies) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
    }

    var currentState = $state.$current.name;
    $scope.title = 'cart.payment.title';
    $scope.masterLoading = false;
    $scope.loading = false;
    $scope.payments = [];
    SavedCards
      .get()
      .then(function(payments){
        $scope.loading = false;
        $scope.payments = payments;
        //if ((!payments || !payments.length) && $state.$current.name == currentState) {
        //  return $state.go('app.cart.payment.add');
        //}
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    $scope.usePaypal = function(){
      $cookies.put('payPaypal', 1);
      $cookies.remove('payData');
      $state.go('app.cart.confirm');
    };

    $scope.usePayment = function(payment){
      $cookies.remove('payPaypal');
      $cookies.put('payData', JSON.stringify(
        {'payment[method]': 'cryozonic_stripe', 'payment[cc_saved]':payment.id, card: payment}
      ));
      //LocalStorage.putObject('payData', {'payment[method]': 'cryozonic_stripe', 'payment[cc_saved]':payment.id, card: payment}, 99999);
      $state.go('app.cart.confirm');
      //$scope.masterLoading = true;
      //Cart.pay({
      //  'payment[method]':       'cryozonic_stripe',
      //  'payment[cc_saved]':     payment.id
      //})
      //  .then(function(orderId){
      //    Cart.clear();
      //    LocalStorage.put('order_id', orderId);
      //    return $stage.go('app.cart.success');
      //  }, function(error){
      //    $scope.masterLoading = false;
      //    $scope.error = error;
      //  })
      //;
    };

    $scope.format = function(card){
      return card.type + ' ' + card.number.slice(-4);
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.SavedCards
 * @description
 * # SavedCards
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('SavedCards', function (User, $q, $http, ApiLink, Utils, MagentoPostRequest) {
    var _get = function(){
      return $q(function(resolve, reject){
        $http({
          method: 'GET',
          url: ApiLink.get('stripe', 'savedcards'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        }).then(function(response) {
          if (response.data.message && response.data.message.logged_in === '0') {
            User.goToLogin();
          }
          if (response.data.savedcards && response.data.savedcards.savedcard) {
            return resolve(Utils.arrayfy(response.data.savedcards.savedcard));
          }
          return resolve([]);
        }, function(){
          reject('error.connexion_lost');
        })
        ;
      });
    };

    var _delete = function(id) {
      return $q(function(resolve){
        MagentoPostRequest(
          ApiLink.get('stripe', 'savedcards'),
          {'card[0]': id},
          User.getToken()
        ).then(function() {
            return resolve();
          }, function(){
            resolve();
          })
        ;
      });
    };

    return {
      'get':    _get,
      'delete': _delete
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartPaymentAddCtrl
 * @description
 * # CartPaymentAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartPaymentAddCtrl', function ($scope, User, Cart, LocalStorage, $state, $cookies) {
    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'));
    }

    $scope.title = 'cart.payment.title';
    $scope.loading = false;

    $scope.save_my_card = true;

    $scope.payDataPresent = !!$cookies.get('payData');

    var isOk = function() {
      $scope.error = null;
      if (!$scope.cardNumber) {
        $scope.error = 'card.error.number';
        return false;
      }
      if (!$scope.cardExpiry) {
        $scope.error = 'card.error.exp';
        return false;
      }
      if (!$scope.cardCvc) {
        $scope.error = 'card.error.cvc';
        return false;
      }

      return true;
    };

    $scope.submitForm = function(){
      if (!isOk()) {
        return false;
      }

      $cookies.remove('payPaypal');
      $cookies.put('payData', JSON.stringify({
        'payment[method]':       'cryozonic_stripe',
        'payment[cc_owner]':     $scope.owner,
        'payment[cc_number]':    $scope.cardNumber,
        'payment[cc_exp_month]': $scope.cardExpiry.month,
        'payment[cc_exp_year]':  $scope.cardExpiry.year,
        'payment[cc_cid]':       $scope.cardCvc,
        'payment[cc_save]':      $scope.save_my_card ? 'on' : 'new_card',
        'card':{
          'new': 1,
          'type': $scope.cardType,
          num:    $scope.cardNumber.slice(-4)
        }
      }), 99999);

      return $state.go('app.cart.confirm');
      $scope.loading = true;
      Cart.pay({
        'payment[method]':       'cryozonic_stripe',
        'payment[cc_owner]':     $scope.owner,
        'payment[cc_number]':    $scope.cardNumber,
        'payment[cc_exp_month]': $scope.cardExpiry.month,
        'payment[cc_exp_year]':  $scope.cardExpiry.year,
        'payment[cc_cid]':       $scope.cardCvc,
        'payment[cc_save]':      $scope.save_my_card ? 'on' : 'new_card'
      })
        .then(function(orderId){
          LocalStorage.put('order_id', orderId);
          return $state.go('app.cart.success');
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    //exp_date: 'Date d\'expiration',
    //  cvc: 'Cryptogramme',
    //  reusable: 'Mémoriser pour mes prochains achats',
    //  error_number: 'Numéro de carte erroné',
    //  error_exp: 'Date d\'expiration erronée',
    //  error_cvc: 'Cryptogramme erroné',
    //
    //
    //<pre>
    //Expire: {{ cardExpiry }}
    //Crypto: {{  }}
    //Rememb: {{  }}
    //</pre>
    //
    //

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SuccessCtrl', function ($scope, LocalStorage, User, order, $translate, Utils, $state) {
    $scope.title   = 'success.title';
    $scope.orderId = LocalStorage.get('order_id');
    $scope.num     = LocalStorage.get('increment_id');

    //$scope.orderId = 603642;
    //$scope.num     = 200076585;

    $scope.success    = true;
    $scope.loading    = true;
    $scope.order      = null;
    $scope.error      = false;
    $scope.Utils      = Utils;

    $scope.items      = [];
    $scope.totals     = [];

    LocalStorage.remove('go_detail_cart');
    LocalStorage.put('go_detail_cart', 0);
    LocalStorage.clear();

    if (!$scope.orderId) {
      $state.go('app.my-account.orders');
    }

    $scope.formatAddress = Utils.formatAddress;

    order.get($scope.orderId).then(
      function (response){
        if (response.message && response.message.status === 'error') {
          $scope.loading = false;
          return $scope.error = response.message.text;
        }
        if (response.order_details) {
          $scope.order = response.order_details;
          $scope.items = Utils.arrayfy($scope.order.ordered_items.item);
          $scope.ids = [];
          angular.forEach($scope.items, function(item){
            $scope.ids.push(item._product_id);
          });
          $scope.totals = [];
          angular.forEach($scope.order.totals, function(v) {
            if (v.summary) v = v.summary;
            $scope.totals.push({label: v._label, val: v.__text});
          });
          $scope.loading = false; // here for tracking
          return ;

        }
        $scope.error = 'error.connexion_lost';
        $scope.loading = false;
      },
      function (){
        $scope.loading = false;
        $scope.error = 'error.connexion_lost';
      }
    );

    $scope.sameAddresses = function(a,b) {
      if (a.entity_id.__text == b.entity_id.__text) {
        return true;
      }
      return a.city.__text == b.city.__text &&
        a.country.__text == b.country.__text &&
        a.country_id.__text == b.country_id.__text &&
        a.firstname.__text == b.firstname.__text &&
        a.lastname.__text == b.lastname.__text &&
        a.postcode.__text == b.postcode.__text &&
        a.street1.__text == b.street1.__text &&
        a.street.__text == b.street.__text &&
        a.telephone.__text == b.telephone.__text;
    }

  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:SearchBtn
 * @description
 * # SearchBtn
 */
angular.module('angularApp')
  .directive('searchBtn', function ($state) {
    return {
      templateUrl: 'views/directives/search-btn.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.searchValue = '';
        var el = element.find('.right-menu-opener');
        var form = element.find(el.attr('href'));
        el
          .click(function(e){
            form.show();
            form.find('input').focus();
            e.preventDefault();
            return false;
          })
        ;
        form
          .find('.close-btn')
          .click(function(e){
            e.preventDefault();
            form.hide();
            return false;
          })
        ;

        scope.goToSearch = function(){
          $state.go('app.store.search', {q: scope.searchValue});
          return false;
        };
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfileCtrl
 * @description
 * # MyAccountProfileCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfileCtrl', function ($scope, User, $timeout, Lang) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    switch (Lang.get()) {
      case 'de':
        $scope.cgvSlug = 'agb';
        break;
      case 'uk':
        $scope.cgvSlug = 'terms-and-conditions';
        break;
      case 'us':
      case 'fr':
      default:
        $scope.cgvSlug = 'conditions-generales-de-vente';
        break;
    }
    $scope.success = null;
    $scope.loading = true;
    $scope.loadingNewsletter = true;
    $scope.title = 'myaccount.profile.title';
    $scope.user = null;
    var first = true;

    User
      .getInfos(true)
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;
        $scope.user.newsletter = !!parseInt($scope.user.newsletter.is_subscribed);

        $timeout(function(){
          $scope.$watch('user.newsletter', function(val){
            if (first) {
              return first = false;
            }
            User.updateNewsletter(val);
          });
        });

      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    $scope.submitForm = function(){
      $scope.loading = true;
      User
        .updateName($scope.user.firstname, $scope.user.lastname)
        .then(function(msg){
          $scope.success = msg;
          $scope.loading = false;
          $scope.error = null;
          $timeout(function(){
            $scope.success = null;
          }, 5000);
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountCardsCtrl
 * @description
 * # MyAccountCardsCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountCardsCtrl', function ($scope, User, SavedCards) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.success = null;
    $scope.loading = true;
    $scope.title = 'myaccount.profile.cards';
    $scope.cards = [];

    SavedCards
      .get()
      .then(function(cards){
        $scope.error = null;
        $scope.loading = false;
        $scope.cards = cards;
      }, function(error){
        $scope.error = error;
        $scope.loading = false;
      })
    ;

    $scope.format = function(card){
      return card.type + ' ' + card.number.slice(-4);
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesCtrl
 * @description
 * # MyAccountAddressesCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesCtrl', function ($scope, User, Address) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title = 'myaccount.profile.addresses';
    $scope.masterLoading = false;
    $scope.loading = true;
    $scope.addresses = [];
    Address
      .getAddresses(true)
      .then(function(addresses){
        $scope.loading = false;
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountFreeOrdersCtrl
 * @description
 * # MyAccountFreeOrdersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountFreeOrdersCtrl', function ($scope, User, $translate) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.loading = true;
    $scope.title = 'myaccount.profile.free_order.title';
    $scope.user = null;
    $scope.email = '';
    $scope.password = '';
    $scope.translateData = {email: $scope.email};

    // FOR SHARE URLS
    // $compileProvider.aHrefSanitizationWhitelist (app.js)
    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user    = data;
        setShareUrls(data.referafriend.share_link);
      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    var setShareUrls = function(_url){
      $translate('myaccount.profile.free_order.sharemsg', {url: _url}).then(function (url) {
        //url = escape(url);
        $scope.share = {
          facebook: 'https://www.facebook.com/dialog/share?app_id=406695926021804&display=page&href='+encodeURIComponent(_url)+'&redirect_uri=' + escape(location.href),
          //sms: 'sms:&body='+  url,
          whatsapp: 'whatsapp://send?text=' + encodeURIComponent(url),
          twitter: 'twitter://post?message=' + encodeURIComponent(url)
        };
      });
    };


  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PageHelpCtrl
 * @description
 * # PageHelpCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('PageHelpCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('SearchCtrl', function ($scope, $stateParams, $state, Product, Utils, $timeout) {
    $scope.search     = $stateParams.q;

    $scope.page       = 0;
    $scope.title      = $scope.search;
    $scope.loaded     = false;
    $scope.fromSearch = true;
    $scope.infiniteLoading = false;
    $scope.infiniteDisabled = true;
    $scope.productsTracking = null;

    $scope.loading = true;
    $scope.category = null;

    Product
      .search($scope.search, $scope.page)
      .then(function(products){
        $scope.loading = false;
        $scope.products = products;

        var productsTracking = [];
        angular.forEach($scope.products, function(product){
          productsTracking.push(product.entity_id);
        });
        $scope.productsTracking = productsTracking;

        $timeout(function(){$scope.infiniteDisabled = false;});
        $scope.page = 1;
      }, function(e){
        $scope.error = e;
        $scope.loading = false;
      })
    ;

    $scope.loadMore = function(){
      if ($scope.infiniteLoading || $scope.infiniteDisabled || !$scope.page) {
        return ;
      }
      $scope.infiniteLoading = true;
      Product
        .search($scope.search, $scope.page++)
        .then(function(products){
          $scope.infiniteLoading = false;
          if (!products.length) {
            return $scope.infiniteDisabled = true;
          }
          angular.forEach(products, function(item) {
            $scope.products.push(item);
          });
        }, function(){
          $scope.infiniteLoading = false;
        })
      ;
    };

    $scope.goToProduct = function(product) {
      $state.go('^.product', {productslug: product.entity_id + '-' + Utils.slugify(product.name)});
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfileEmailCtrl
 * @description
 * # MyAccountProfileEmailCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfileEmailCtrl', function ($scope, $state, User, $timeout) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.loading = true;
    $scope.title = 'myaccount.profile.email';
    $scope.user = null;
    $scope.email = '';
    $scope.password = '';
    $scope.translateData = {email: $scope.email};

    User
      .getInfos()
      .then(function(data){
        $scope.loading = false;
        $scope.user = data;
        $scope.translateData = {email: data.email + ''};
      }, function(e){
        $scope.loading = false;
        $scope.error = e;
      })
    ;

    $scope.submitForm = function(){
      $scope.success = null;
      $scope.error = null;
      $scope.loading = true;
      User
        .updateEmail($scope.email, $scope.password)
        .then(function(msg){
          $scope.success = msg;
          $scope.loading = false;
        }, function(error){
          $scope.error = error;
          $scope.loading = false;
        })
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountProfilePasswordCtrl
 * @description
 * # MyAccountProfilePasswordCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountProfilePasswordCtrl', function ($scope, $state, User, $timeout) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    User.getInfos(true); // Hack login page if user isnt connected

    $scope.loading = false;
    $scope.title = 'myaccount.profile.password';

    $scope.current = '';
    $scope.password = '';

    $scope.submitForm = function () {
      $scope.success = null;
      $scope.error = null;
      $scope.loading = true;
      User
        .updatePassword($scope.current, $scope.password)
        .then(function (msg) {
          $scope.success = msg;
          $scope.loading = false;
          $timeout(function () {
            return $state.go('app.my-account');
          }, 5000);

        }, function (error) {
          $scope.error = error;
          $scope.loading = false;
        })
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountCardsDetailCtrl
 * @description
 * # MyAccountCardsDetailCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountCardsDetailCtrl', function ($scope, User, $state, SavedCards, $stateParams) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.success = null;
    $scope.loading = true;
    $scope.title = 'myaccount.profile.cards';
    $scope.card = null;

    SavedCards
      .get()
      .then(function(cards){
        $scope.error = null;
        $scope.loading = false;
        angular.forEach(cards, function(card){
          if (card.id == $stateParams.id) {
            setCard(card);
          }
        });
        if (!$scope.card){
          $scope.error = 'card.not_found';
        }
      }, function(error){
        $scope.error = error;
        $scope.loading = false;
      })
    ;

    var setCard = function(card){
      $scope.card = card;
      $scope.number = '•••• •••• •••• ' + card.number.slice(-4);
      var date = card.expire.split('/');
      var month = parseInt(date[0]);
      month = month < 10 ? '0' + month : month;
      $scope.date = month + ' / ' + (2000 + parseInt(date[1]));
    };

    $scope.deleteCard = function(){
      $scope.loading = true;
      SavedCards.delete($scope.card.id).then(function(){
        return $state.go('app.my-account.cards');
      })
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesEditCtrl
 * @description
 * # MyAccountAddressesEditCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesEditCtrl', function ($scope, User, Address, Lang, $state, $stateParams) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }


    $scope.title = 'myaccount.profile.addresses_edit';
    $scope.loading = true;
    $scope.address = null;
    $scope.id = parseInt($stateParams.id);

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;

    $scope.state = '';

    $scope.addresses = [];
    Address
      .getAddresses()
      .then(function(addresses){
        $scope.loading = false;
        angular.forEach(addresses, function(address){
          if (address.entity_id == $scope.id) {
            setAddress($scope.address = address);
          }
        });
        $scope.addresses = addresses;
      }, function(err){
        $scope.loading = false;
        $scope.error = err;
      })
    ;

    var setAddress = function(address) {
      $scope.country = address.country_id;
      $scope.firstname = address.firstname;
      $scope.lastname = address.lastname;
      $scope.street = address.street;
      $scope.street1 = address.street == address.street1 ? '' : address.street1;
      $scope.city = address.city;
      $scope.postcode = address.postcode;
      $scope.telephone = address.telephone;
      $scope.state = address.region_code;
      $scope.country_id = address.firstname;
    };

    $scope.submitForm = function(){

      if (!$scope.firstname) {
        return $scope.error = 'error.empty.firstname';
      }
      if (!$scope.lastname) {
        return $scope.error = 'error.empty.lastname';
      }
      if (!$scope.street) {
        return $scope.error = 'error.empty.street';
      }
      if (!$scope.city) {
        return $scope.error = 'error.empty.city';
      }
      if (!$scope.postcode) {
        return $scope.error = 'error.empty.postcode';
      }

      if (!$scope.validPhone) {
        return $scope.error = 'error.phone_number';
      }

      $scope.loading = true;
      $scope.error = null;
      Address.edit({
        id:             $scope.id,
        'firstname': $scope.firstname,
        'lastname': $scope.lastname,
        'street[0]': $scope.street,
        'street[1]': $scope.street1,
        'city': $scope.city,
        'postcode': $scope.postcode,
        'telephone': $scope.telephone,
        'save_in_address_book': 1,
        'region_id': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'country_id': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country)
        //
        //'firstname':    $scope.address.firstname,
        //'lastname':     $scope.address.lastname,
        //'street[0]':    $scope.address.street1,
        //'street[1]':    $scope.address.street2,
        //'city':         $scope.address.city,
        //'postcode':     $scope.address.postcode,
        //'telephone':    $scope.address.telephone,
        //'country_id':   Lang.get().toUpperCase()
      }).then(function(){
        return $state.go('app.my-account.addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

    $scope.deleteAddress = function(){
      $scope.loading = true;
      Address.delete($scope.id).then(function(){
        return $state.go('app.my-account.addresses');
      })
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountAddressesAddCtrl
 * @description
 * # MyAccountAddressesAddCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountAddressesAddCtrl', function ($scope, User, Address, Lang, $state) {
    if (!User.isLoggued()) {
      return User.goToLogin();
    }

    $scope.title      = 'myaccount.profile.addresses_add';
    $scope.loading    = false;

    $scope.firstname = '';
    $scope.lastname = '';
    $scope.street = '';
    $scope.street1 = '';
    $scope.city = '';
    $scope.postcode = '';
    $scope.telephone = '';
    $scope.state = '';
    $scope.country = Lang.get().toUpperCase();
    $scope.validPhone = false;


    $scope.validUpdate = function(val) {
      $scope.validPhone = val;
    };


    $scope.submitForm = function(){
      $scope.error = null;

      if (!$scope.firstname) {
        return $scope.error = 'error.empty.firstname';
      }
      if (!$scope.lastname) {
        return $scope.error = 'error.empty.lastname';
      }
      if (!$scope.street) {
        return $scope.error = 'error.empty.street';
      }
      if (!$scope.city) {
        return $scope.error = 'error.empty.city';
      }
      if (!$scope.postcode) {
        return $scope.error = 'error.empty.postcode';
      }

      if (!$scope.validPhone) {
        return $scope.error = 'error.phone_number';
      }

      $scope.loading = true;
      Address.edit({
        'firstname': $scope.firstname,
        'lastname': $scope.lastname,
        'street[0]': $scope.street,
        'street[1]': $scope.street1,
        'city': $scope.city,
        'postcode': $scope.postcode,
        'telephone': $scope.telephone,
        'save_in_address_book': 1,
        'region_id': (typeof $scope.state == 'object' ? $scope.state._code : $scope.state),
        'country_id': (typeof $scope.country == 'object' ? $scope.country._code : $scope.country)
      }).then(function(){
        return $state.go('app.my-account.addresses');
      }, function(error){
        $scope.loading = false;
        $scope.error = error;
      });
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CmsPageCtrl
 * @description
 * # CmsPageCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CmsPageCtrl', function ($scope, $stateParams, Cms) {
    $scope.loading = true;
    $scope.slug = $stateParams.slug;
    $scope.title = $stateParams.slug.split('-').join(' ').toUpperCase();

    $scope.content = '';

    Cms
      .get($stateParams.slug)
      .then(function(html){
        $scope.content = html;
        $scope.loading = false;
      }, function(e){
        $scope.error = e;
        $scope.loading = false;
      })
    ;
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cms
 * @description
 * # Cms
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cms', function (LocalStorage, $http, $q, ApiLink) {
    var _get = function(slug){
      return $q(function(resolve, reject){
        var ret = LocalStorage.get('page/' + slug);
        if (ret) {
          return resolve(ret);
        }

        return $http
          .get(ApiLink.get('cms', 'page', {id: slug}))
          .then(function(response){
            ret = response.data;
            LocalStorage.put('page/' + slug, ret, 3600 * 24);
            return resolve(ret);
          }, function(){
            return reject('error.connexion_lost');
          })
        ;
      });
    };

    return {
      'get': _get
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cmsPage
 * @description
 * # cmsPage
 */
angular.module('angularApp')
  .directive('cmsPage', function () {
    return {
      scope: {
        cmsPage: '='
      },
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch('cmsPage', function(val){
          if (!val) {
            return ;
          }
          element.html(val.replace(/<a name="([a-z]+)"><\/a>/gi, '<div id="$1"></div>'));

          var $el = jQuery(element[0]);

          $el.find('a[href^=#]').each(function() {
            var $link = jQuery(this);
            var selector = $link.attr('href');
            var target = angular.element(selector);
            if (!target.length) {
              return ;
            }

            $link.data('target', target);

            $link.click(function(e){
              e.preventDefault();
              e.stopPropagation();

              try {
                window.target = $(this).data('target');
                jQuery('html,body').animate({scrollTop: $(this).data('target').offset().top - 65}, 'slow');
              } catch (e) {
                console.error('target en carton');
              }

              return false;
            });
          });
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartEditCtrl
 * @description
 * # CartEditCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartEditCtrl', function ($scope, Utils, User, Cart, $stateParams, Product, $state, $timeout, LocalStorage) {

    if (!User.isLoggued()) {
      return User.goToLogin($state.href('app.cart'))
    }

    $scope.title      = 'cart.edit_product';
    $scope.loading    = true;
    $scope.error      = false;
    $scope.item       = null;
    $scope.images       = [];

    Cart.getDetails().then(function(){
      angular.forEach(Cart.getFormattedDetails().items, function(cartItem){
        if (cartItem.item_id == $stateParams.itemId) {
          $scope.item = cartItem;
          $scope.item.qty = parseInt($scope.item.qty);

          Product
            .get(cartItem.entity_id)
            .then(function(product){
              $scope.product = product;
              $scope.images   = [];
              angular.forEach(Utils.arrayfy(product.images.image), function(img){
                $scope.images.push(img.file._url);
              });
              $scope.options  = Utils.arrayfy(product.product.options.option);
              if (!product.product.options.option) {
                $scope.options = [];
              }
              var itemOpts = Array.isArray($scope.item.options.option) ? $scope.item.options.option : [$scope.item.options.option];

              if ($scope.options.length) {
                angular.forEach($scope.options, function (option, key) {
                  $scope.options[key].value = option.value = Utils.arrayfy(option.value);
                  if (option.value.length) {
                    angular.forEach(option.value, function (val) {
                      angular.forEach(itemOpts, function (productOpt) {
                        val.active = (val._label == productOpt._text && productOpt._label == option._label);
                      });
                    });
                  }
                });
              }
              $scope.loading = false;
            }, function(e){
              $scope.error = e;
              $scope.loading = false;
            })
          ;
        }
      });
      if (!$scope.item) {
        $scope.error = 'cart.edit_empty';
        $timeout(function(){
          return $state.go('app.cart' + (LocalStorage.get('go_detail_cart') ? '.confirm' : ''));
        }, 4000);
      }
    });

    $scope.addQty = function(){
      $scope.item.qty =($scope.item.qty + ($scope.item.qty < 40));
    };

    $scope.delQty = function(){
      $scope.item.qty= ($scope.item.qty - ($scope.item.qty > 1));
    };

    var serializedOptions = function(){
      var ret = {};

      angular.forEach($scope.options, function(option){
        angular.forEach(option.value, function(val) {
          if (val.active) {
            ret[option._code] = val._code;
          }
        })
      });

      return ret;
    };

    var opt_changed = false;
    $scope.changeOption = function(opts, val) {
      opt_changed = true;
      angular.forEach(opts, function(value) {
        value.active = (val._code == value._code);
      });
    };

    $scope.submitForm = function(){
      if (opt_changed) {
        return removeAndAdd();
      }
      else {
        return updateQty();
      }
    };

    //var removeAndAdd = function(){
    //  Cart.deleteItem($scope.item.item_id);
    //};

    var updateQty = function(){
      $scope.loading = true;
      Cart
        .updateQty($scope.item.item_id, $scope.item.qty)
        .then(function(){
          return $state.go('app.cart' + (LocalStorage.get('go_detail_cart') ? '.confirm' : ''));
        })
        .then(function(error){
          $scope.error = error;
          $scope.loading = false;
        })
      ;
    };

    var removeAndAdd = function(){
      $scope.loading    = true;
      Cart
        .addProduct($scope.item.entity_id, $scope.item.qty, serializedOptions())
        .then(function(){
        }, function(error){
          $scope.error = error || 'error.connexion_lost';
          $scope.loading = false;
        })
      ;
      $scope.removeItem();
    };

    $scope.removeItem = function(){
      $scope.loading    = true;
      Cart
        .removeItem($scope.item.item_id)
        .then(function(){
          return $state.go('app.cart' + (LocalStorage.get('go_detail_cart') ? '.confirm' : ''));
        })
        .then(function(error){
          $scope.error = error;
          $scope.loading = false;
        })
      ;
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartConfirmCtrl
 * @description
 * # CartConfirmCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartConfirmCtrl', function ($scope, User, $state, Cart, LocalStorage, Utils, $cookies, $translate, Lang, $window, $http) {
    //if (!User.isLoggued()) {
    //  return User.goToLogin($state.href('app.cart'));
    //}
    $window.scrollTo(0,0);
    LocalStorage.put('go_detail_cart', 1);

    $scope.title      = 'cart.title';
    $scope.loading    = true;
    $scope.promo      = '';
    $scope.promoapplied = '';
    $scope.error      = false;
    $scope.info       = 'cart.reloading';
    $scope.sentence   = null;
    $scope.translateData = {
      agb: '#/de/page/agb',
      Daten: '#/de/page/impressum',
      cgv: '#/fr/page/faq',
      terms: Lang.get() == 'us' ? '#/us/page/conditions-generales-de-vente' : '#/uk/page/terms-and-conditions'
    };

    $scope.payPaypal = $cookies.get('payPaypal') ? parseInt($cookies.get('payPaypal')) : 0;
    $scope.payData = $cookies.get('payData') ? JSON.parse($cookies.get('payData')) : null;


    if (!$scope.payData) {
      var tmpPayData = localStorage.getItem('payData');
      $scope.payData = tmpPayData ? JSON.parse(tmpPayData) : null;
    }


    var setViewData = function(cartDetails, loadingValue){
      cartDetails.then(function(data){
        $scope.fullDetails = data;
        $scope.details = Cart.getFormattedDetails();
        angular.forEach($scope.details.totals, function(tot, key) {
          if (key == 'discount') {
            try {
              $scope.promo = /^.+ \((.+)\)$/.exec(tot.title)[1];
              $scope.promoapplied = $scope.promo;
            }
            catch (e) {
              $scope.promo = '';
            }
          }
        });
        if ($scope.details.colis) {

          $translate(['cart.colis_date', 'cart.colis_package', 'cart.colis_packages', 'month.01', 'month.02', 'month.03', 'month.04', 'month.05', 'month.06', 'month.07', 'month.08', 'month.09', 'month.10', 'month.11', 'month.12']).then(function (trans) {
            var packages = 'cart.colis_package';
            if ($scope.details.colis > 1) {
              packages += 's';
            }
            packages = $scope.details.colis + ' ' + trans[packages];
            var date = new Date($scope.details.date);
            var nb = date.getMonth()+1;
            if (nb < 10) {
              nb = '0' + nb;
            }
            //console.log('trans', trans);

            $scope.sentence = trans['cart.colis_date'].replace('__packs__', packages).replace('__day__', date.getDate()).replace('__month__', trans['month.'+nb]);
          });
        }
        else {
          $scope.sentence = null;
        }
      });
    };

    setViewData(Cart.getDetails(), false);


    Cart
      .getDetails(true)
      .then(function(){
        $scope.error    = null;
        $scope.info     = null;
        $scope.loading   = false;
        setViewData(Cart.getDetails(), false);
      }, function(){
        $scope.loading  = false;
        $scope.error    = 'error.connexion_lost';
      })
    ;

    var checkOk = function(){
      if ($scope.details.empty) {
        $scope.error = 'cart.empty';
        return false;
      }
      if ($scope.formatAddress(null) == $scope.formatAddress($scope.fullDetails.addresses.shipping_address)) {
        $state.go('app.cart.delivery');
        return false;
      }
      if ($scope.formatAddress(null) == $scope.formatAddress($scope.fullDetails.addresses.billing_address)) {
        $state.go('app.cart.billing');
        return false;
      }
      if (!$scope.payData && !$scope.payPaypal) {
        $state.go('app.cart.payment');
        return false;
      }

      return true;
    };

    var paypalPayment = function(){
      $scope.loading = true;

        var totalCart = 0;
        angular.forEach($scope.details.totals, function(total, key) {
            if (key == 'grand_total') {
                totalCart = total.formated_value
            }
        });

        var data = {};
        data.cur = Lang.getCurrency();
        data.id  = $scope.details.id;
        data.v   = total;
        data.f   = '';
        data.l   = '';
        data.a   = '';
        data.c   = '';
        data.s   = '';
        data.z   = '';
        data.cn  = '';
        data.mail= $scope.details.email;
        data.url = 'http://SUCCESS.dev/';
        var url;
        url = '/paypal/';
        //url = 'http://angular.magento.dev/paypal/';
        $http.post('/paypal/paypal.php', data)
            .then(function(data) {
                console.log()

            }, function () {
                $scope.loading = false;
                $scope.error = 'error.unknown_reason';
            })
        ;

      console.log(data);
      return null;
    };

    $scope.pay = function(){
      if (!checkOk()) {
        return false;
      }
      if ($scope.payPaypal) {
        return paypalPayment();
      }
      $scope.loading = true;
      Cart.pay($scope.payData)
        .then(function(data){
          LocalStorage.put('order_id', data.id);
          LocalStorage.put('increment_id', data.increment_id);
          return $state.go('app.cart.success');
        }, function(error){
          $scope.loading = false;
          $scope.error = error;
        })
      ;
    };

    $scope.formatAddress = Utils.formatAddress;

    $scope.submitForm = function(){
      if ($scope.promo) {
        $scope.promoapplied = $scope.promo;
        $scope.loading = true;
        Cart
          .addCoupon($scope.promo)
          .then(function(){
            setViewData(Cart.getDetails(true));
            $scope.loading = false;
          }, function(error){
            $scope.error = error;
            $scope.loading = false;
          });
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cartBtn
 * @description
 * # cartBtn
 */
angular.module('angularApp')
  .directive('cartBtn', function (Cart, $state) {
    return {
      template: '<a href="#/cart" class="cart-icon-top"><span>{{nbProduct}}</span></a>',
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.nbProduct = null;
        Cart.getNbProduct().then(function(val){
          scope.nbProduct = val;
        });
        Cart.notifyUpdate(function(){
          Cart.getNbProduct().then(function(val){
            scope.nbProduct = val;
          });
        });

        element.click(function(){
          $state.go('app.cart');
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductInfoCtrl
 * @description
 * # ProductInfoCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductInfoCtrl', function ($scope, $stateParams, Product) {
    $scope.productId  = parseInt($stateParams.productslug);
    $scope.title      = 'global.loading';

    $scope.loading      = true;
    $scope.error        = false;
    $scope.product      = null;

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading  = false;
        $scope.title    = 'product.info';
        $scope.product  = product;
        window.product = product;
      }, function(){
        $scope.error = true;
        $scope.loading = false;
        // description = info
        // specificities

      })
    ;
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:radRnFix
 * @description
 * # radRnFix
 */
angular.module('angularApp')
  .directive('radRnFix', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        var setSizes = function($ul) {
          var height = $ul.find('img').css('width', '100%').eq(0).height();
          if (!height) {
            height = 580;
          }
          $ul.height(height);
        };
        element.bind('load', function() {
          setSizes(element.closest('ul[rn-carousel]'));
        });
        angular.element('body').on('resize', function(){
          setSizes(element.closest('ul[rn-carousel]'));
        });
      }
    };
  });

'use strict';

(function(angular){
  var isReady = false;
  var scopeData = {};
  var callback = null;
  var itemEl = null;
  var timer = null;

  angular.element(document).ready(function(){
    isReady = true;
    if (callback) {
      if (timer) {
        timer.cancel();
      }
      timer = null;
      callback(scopeData);
      callback = null;
      scopeData = null;
    };
  });

  /**
   * @ngdoc directive
   * @name angularApp.directive:tracking
   * @description
   * # tracking
   */
  angular.module('angularApp')
    .directive('tracking', function (Cart, User, Lang, $timeout, $location, ENV) {
      var getCartIds = function(){
        var ret = [];
        angular.forEach(Cart.getFormattedDetails().items, function(item){
          ret.push(item.entity_id);
        });

        return ret;
      };

      var TRACKER = {
        CJ: {
          product: function () {
            (function (e) {
              var t = '1786', n = document, r, i, s = {
                http: 'http://cdn.mplxtms.com/s/MasterTMS.min.js',
                https: 'https://secure-cdn.mplxtms.com/s/MasterTMS.min.js'
              }, o = s[/\w+/.exec(window.location.protocol)[0]];
              i = n.createElement('script'), i.type = 'text/javascript', i.async = !0, i.src = o + '#' + t, r = n.getElementsByTagName('script')[0], r.parentNode.insertBefore(i, r), i.readyState ? i.onreadystatechange = function () {
                if (i.readyState === 'loaded' || i.readyState === 'complete')i.onreadystatechange = null
              } : i.onload = function () {
                try {
                  e()
                } catch (t) {
                }
              }
            })(function () {
            });

            return '';
          },
          success: function (order) {
            window.MasterTmsUdo = {
              'CJ': {
                'CID': '1533216',
                'TYPE': '377414',
                'DISCOUNT': '' + (order.totals.discount && parseFloat(order.totals.discount.__text.replace('$','').replace('£','').replace(',','.')) * -1 || 0),
                'OID': '' + order.number,
                'COUPON': (order.totals.discount ? 'ATTENTE WEB SERVICE' : ''),
                'CURRENCY': Lang.getCurrency(),
                'AMOUNT': '0',
                'FIRECJ': 'TRUE',
                PRODUCTLIST: [
                  {
                    'ITEM': User.isLoggued() ? 'old' : 'new',
                    'AMT': '' + Cart.getFormattedDetails().totals.subtotal.value,
                    'QTY': '1',
                    'DCNT': '0'
                  }
                ]
              }
            };
            return '';
          }
        },
        facebook: {
          add_to_cart: function (trackingData) {
            window._fbq = window._fbq || [];
            window._fbq.push(['track', '6022242255528', {'value': '' + parseFloat(trackingData.product.price._regular.replace('$','').replace('£','').replace(',','.')) * trackingData.qty, 'currency': Lang.getCurrency()}]);
            return '';
          },
          success: function () {
            window._fbq = window._fbq || [];
            window._fbq.push(['track', '6008869953328', {'value': '' + parseFloat(order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.')), 'currency': Lang.getCurrency()}]);
            return '';
          },
          all: function () {
            var a = new Image;
            a.src = 'https://www.facebook.com/tr?id=594067254033319&ev=PageView&noscript=1&_=' +  new Date().getTime();
            return '';
          }
        },
        ometria: {
          all: function(){
            //console.log('OMETRIA PIXEL');
            var url = window.location.protocol+"//cdn.ometria.com/tags/e965f97c4ae02674.js";
            setTimeout(function(){var sc=document.createElement('script');sc.src=url;sc.setAttribute('async','true');
              document.getElementsByTagName("head")[0].appendChild(sc);},50);
            return '';
          }
        },
        twitter: {
          success: function(){
            window.twttr.conversion.trackPid("l4wsu", { tw_sale_amount: parseFloat(order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.')), tw_order_quantity: 1 });
            return '';
          },
          all: function(){
            window.twttr.conversion.trackPid("l4wsy", { tw_sale_amount: Cart.getFormattedDetails().totals && Cart.getFormattedDetails().totals.grand_total && Cart.getFormattedDetails().totals.grand_total.value, tw_order_quantity: 1});
            return '';
          }
        },
        outbrain: {
          success: function(){
            var a = new Image;
            a.src = 'https://traffic.outbrain.com/network/trackpxl?advid=30615&action=view&_=' +  new Date().getTime();
            return '';
          }
        },
        analytics: {
          all: function(data){
            var getPrice = function(val) {
              try {
                return parseFloat(val.replace('$', '').replace('£', '').replace(',', '.'));
              } catch (e) {
                return 0.0;
              }
            };

            var getImpressionFieldObject = function(id, price, name, qty){
              var product = data.product;
              id = id ? id : product.entity_id;
              try {
                price = price ? price : product.price._regular;
                name = name ? name : product.name;
              } catch (e) {
                price = price ? price : 0;
                name = name ? name : 'name bug';
              }
              var ret = {
                'id':       id,
                'name':     name,
                'price':    getPrice(price)
              };

              if (qty) {
                ret.quantity = qty;
              }
              return ret;
            };

            var step = 0;
            switch (data.type) {
              case 'product':
                __gaTracker('ec:addProduct', getImpressionFieldObject());
                step = 1;
                //__gaTracker('send', 'event', 'catalog', 'impression', {'nonInteraction': true});
                break;
              case 'add2cart':
                __gaTracker('ec:addProduct', getImpressionFieldObject());
                step = 2;
                break;
              case 'cart-confirmation':
                angular.forEach(data.items, function(item){
                  var price = item.formated_price._special ? item.formated_price._special : item.formated_price._regular;
                  __gaTracker('ec:addProduct', getImpressionFieldObject(item.item_id, price, item.name, parseInt(item.qty)));
                });
                step = 3;
                break;
              case 'cart-product-edit':
                __gaTracker('ec:addProduct', getImpressionFieldObject(data.product.product._id, data.product.price._regular, data.product.name, parseInt(data.qty)));
                step = 4;
                break;
              case 'auth-connexion':
                step = 5;
                break;
              case 'cart-delivery-address-list':
              case 'cart-delivery-address-create':
                step = 6;
                break;
              case 'cart-payment-add':
              case 'cart-payment-list':
                step = 7;
                break;
              case 'checkout-success':
                //case 'account-order-detail':
                angular.forEach(data.items, function(item){
                  __gaTracker('ec:addProduct', getImpressionFieldObject(item._product_id, item.price.including_tax._value, item.name, item.qty.value.__text));
                });
                var objData = {
                  id:         data.order.number,
                  revenue:    getPrice(data.order.totals.grand_total.__text),
                  step:       8
                };
                if (data.order.totals.tax && data.order.totals.tax.summary) {
                  objData.tax = getPrice(data.order.totals.tax.summary.__text);
                }
                if (data.order.totals && data.order.totals.shipping) {
                  objData.shipping = getPrice(data.order.totals.shipping.__text);
                }
                if (data.order.totals.discount) {
                  try {
                    objData.coupon = /^.+ \((.+)\)$/.exec(data.order.totals.discount._label)[1];
                  }
                  catch (e){
                    // ignore coupong
                  }
                }
                __gaTracker('ec:setAction', 'purchase', objData);
                __gaTracker('send', 'pageview', {
                  'page': $location.path()
                });
                break;
              default:
                __gaTracker('send', 'pageview', {
                  'page': $location.path()
                });
                break;
            }
            if (step > 0) {
              __gaTracker('ec:setAction','checkout', {
                'step': step
              });
              __gaTracker('send', 'pageview');
            }
            return '';
          }
        }
      };

      return {
        template: '<div class="hide"></div>',
        restrict: 'E',
        scope: {
          type: '@', // product, success, all
          data: '=' // all => {id: product_id, type: home|product|account,xxxx}
        },
        link: function postLink(scope, element) {
          var html = '';

          scopeData = scope;
          itemEl = element;

          callback = function() {
            console.info('tracking', scopeData.data.type);
            angular.forEach(TRACKER, function (data) {
              try {
                if (data[scopeData.type]) {
                  html += data[scopeData.type](scopeData.data);
                }
              }
              catch (e) {
                console.error(e);
              }
            });
            itemEl.html(html);
          };

          if (isReady) {
            if (timer != null) {
              $timeout.cancel(timer);
            }
            timer = $timeout(function(){
              timer = null;
              callback(scopeData);
              callback = null;
              scopeData = null;
            }, 250);
          }
        }
      };
    });
})(angular);

'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('RootCtrl', function ($scope, $translate, $stateParams, $state, Lang, Configuration, $http, ENV, $cookies, $timeout) {
    var go = function(l) {
      $cookies.remove('login/backpath');
      return $state.go('app.store', {store: l});
    };
    if (!$stateParams.store) {
      if (ENV.name == 'development') {
        return go(ENV.defaultLang);
      }
      else {
        return $http.get('/getlocale.php').then(function(response){
          $timeout(function(){
            return go(response.data);
          }, 100);
        }, function(){
          $timeout(function(){
            return go(ENV.defaultLang);
          });
        });
      }
    }
    if ($stateParams.store != $translate.use()) {
      $scope.activeLang = $stateParams.store;
      Lang.set($scope.activeLang);
      $translate.use($scope.activeLang);
      angular.element('.modal-backdrop.in').remove();
      angular.element('.modal-open').removeClass('modal-open');
    }
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:videoPlayer
 * @description
 * # videoPlayer
 */
angular.module('angularApp')
  .directive('videoPlayer', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        videoPlayer: '@',
        masterLoader: '='
      },
      link: function postLink(scope, element, attrs) {
        element.click(function(e){
          scope.$apply(function(){
            scope.masterLoader.val = true;
          });
          $timeout(function(){
            scope.$apply(function(){
              scope.masterLoader.val = false;
            });
          }, 3000);
          e.preventDefault();
          var poster = element.find('img').attr('src');
          angular.element('#videoPlayerVideo').remove();
          angular
            .element('body')
            .append('<div class="player-video" id="videoPlayerVideo">' +
              '<video poster="'+ poster +'" controls preload="auto" x-webkit-airplay crossorigin="anonymous" src="' + scope.videoPlayer + '">' +
                '<source src="'+ scope.videoPlayer+'">' +
              '</video>' +
            '</div>')
          ;
          angular.element('#videoPlayerVideo video')[0].play();
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name angularApp.Configuration
 * @description
 * # Configuration
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Configuration', function ($rootScope, ApiLink, $q, $http, $timeout, Lang) {
    var initDone        = false;
    var initInProgress  = false;
    var getPromise      = $q.defer();
    var data            = {};
    var reloadCb        = null;

    var init = function() {
      initDone = false;
      initInProgress = true;
      $http.get(ApiLink.get('init', 'init', {'country': Lang.get()})).then(function (response) {
        data = response.data.init;
        initDone = true;
        getPromise.resolve(data);
        if (reloadCb) {
          reloadCb(data);
        }
      }, function () {
        initInProgress = false;
        getPromise.reject();
      })
    };

    var reload = function(cb) {
      if (cb) {
        reloadCb = cb;
        return data;
      }
      initInProgress = false;
      initDone = false;
      init();
    };

    $timeout(function(){
      if (!initInProgress && !initDone) {
        init();
      }
    }, 0);

    return {
      done: function(){ return initDone; },
      initInProgress: function() { return initInProgress; },
      data: function(){ return data; },
      promise: getPromise.promise,
      reload: reload
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:phoneNumber
 * @description
 * # phoneNumber
 */
angular.module('angularApp')
  .directive('phoneNumber', function () {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();

    return {
      restrict: 'A',
      scope: {
        isValid: '=phoneNumber',
        updateIsValid:'=updator',
        model: '=ngModel',
        country: '=country'
      },
      link: function postLink(scope, element, attrs) {
        scope.$watchGroup(['model','country'], function(){
          var phoneNumber = scope.model;
          var regionCode  = scope.country;

          if (!phoneNumber && !regionCode) {
            scope.validPhone = false;
            return ;
          }

          try {
            var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
            scope.isValid = phoneUtil.isValidNumber(number);
            scope.updateIsValid && scope.updateIsValid(scope.isValid);
            if (scope.isValid) {
              scope.model = phoneUtil.format(number, i18n.phonenumbers.PhoneNumberFormat.E164);
              element.val(scope.model);
            }
          }
          catch (e) {

          }
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:magentoAddress
 * @description
 * # magentoAddress
 */
angular.module('angularApp')
  .directive('magentoAddress', function (Configuration, Utils, $timeout, $translate, Lang, LocalStorage) {
    return {
      templateUrl: 'views/directives/magento-address.html',
      restrict: 'E',
      scope: {
        firstname: '=',
        lastname: '=',
        street: '=',
        street1: '=',
        city: '=',
        postcode: '=',
        telephone: '=',
        state: '=',
        country: '=',
        validPhone: '=',
        updator: '='
      },
      link: function postLink(scope, element, attrs) {

        var fn = LocalStorage.get('firstname');
        var ln = LocalStorage.get('lastname');

        if (fn && !scope.firstname) {
          scope.firstname = fn;
        }
        if (ln && !scope.lastname) {
          scope.lastname = ln;
        }

        var firstLoad = true;
        scope.states     = null;
        scope.countries  = null;
        scope.detailsAutocomplete = {};

        scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
        scope.optionsAutocomplete = { country: scope.countryCode, types: 'address' };

        scope.$watch('state', function(newV){
          scope.setState(newV);
        });
        var st = '' + scope.state;
        scope.updateState = function(state) {
          scope.state = state;
        };

        scope.updateCountry = function(value){
          if (value) {
            scope.country = value;
          }
          if (!scope.country) {
            return ;
          }

          scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();

          scope.optionsAutocomplete = {
            country: scope.countryCode,
            types: 'address'
          };

          if (firstLoad) {
            firstLoad = false;
            return ;
          }

          scope.street     = '';
          scope.street1    = '';
          scope.city       = '';
          scope.postcode   = '';
        };

        var configCountry = function(config) {
          if (config.states && config.states.state) {
            scope.states = config.states.state;
            angular.forEach(scope.states, function(st){
              if (scope.state == st._code) {
                scope.state = st;
              }
            });
          }
          if (config.allowed_countries && config.allowed_countries.country) {
            scope.countries = Utils.arrayfy(config.allowed_countries.country);
            $translate('cart.delivery.country').then(function(country){
              angular.forEach(scope.countries, function(v,k){
                scope.countries[k].__text = country + ': ' + v.__text;
              });
            });
            angular.forEach(scope.countries, function(country){
              if (scope.country == country._code) {
                scope.country = country;
              }
            });
            if (scope.countries.length < 2) {
              scope.country = scope.countries[0];
            }

            try {
              scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
            }
            catch (e) {
              scope.countryCode = Lang.get();
            }
          }
        };

        var getComponentAutocompleteValue = function(searchedType, short) {
          var ret = null;
          if (scope.detailsAutocomplete) {
            angular.forEach(scope.detailsAutocomplete.address_components, function(item){
              if (!ret) {
                angular.forEach(item.types, function (type) {
                  if (searchedType == type) {
                    ret = (short === true) ? item.short_name : item.long_name;
                  }
                });
              }
            });
          }
          return ret;
        };

        scope.$watch('detailsAutocomplete', function(){
          if (scope.detailsAutocomplete && scope.detailsAutocomplete.address_components) {
            scope.setState(getComponentAutocompleteValue('administrative_area_level_1', true));

            var reverseFormat = false;
            try {
              reverseFormat = (['be','at','de'].indexOf(scope.country._code.toLowerCase()) != -1)
            }
            catch (e) {
            }
            var nb = getComponentAutocompleteValue('street_number');
            scope.street1  = '';
            if (reverseFormat) {
              scope.street = getComponentAutocompleteValue('route') + (nb ? ' ' + nb : '');
            }
            else {
              scope.street = (nb ? nb + ' ' : '') + getComponentAutocompleteValue('route');
            }
            scope.postcode = getComponentAutocompleteValue('postal_code');
            scope.city     = getComponentAutocompleteValue('locality') ? getComponentAutocompleteValue('locality') : getComponentAutocompleteValue('sublocality_level_1');
          }
        });

        scope.setState = function(stateCode) {
          if (typeof stateCode === 'object') {
            return ;
          }
          if (stateCode) {
            if (stateCode && scope.states && scope.states.length) {
              stateCode = stateCode.toUpperCase();
              angular.forEach(scope.states, function(st){
                if (stateCode == st._code) {
                  scope.state = st;
                  $timeout(function(){
                    angular.element('#state-list').val(st._code).focus().change().blur();
                  });
                }
              });
            }
          }
        };

        $timeout(function() {
          Configuration.reload(configCountry);
          //
          Configuration.done();
          Configuration.data();
          //
          if (Configuration.done()) {
            configCountry(Configuration.data());
          }
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:smartBanner
 * @description
 * # smartBanner
 */
angular.module('angularApp')
  .directive('smartBanner', function (Lang, $translate, Configuration, $timeout, Utils) {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var initBanner = function initBanner(config){
          try {
            var baseConfig = config.smart_banner[Utils.isIOS() ? 'ios' : 'android'];
            if (baseConfig._enabled != '1') {
              return;
            }
            var bannerConfig = {
              //daysHidden: 15,
              //daysReminder: 90,
              appStoreLanguage: Lang.get(),
              title: baseConfig._title,
              author: baseConfig._subtitle,
              button: baseConfig._action,
              price: {
                android: baseConfig._price,
                ios: baseConfig._price
              },
              store: {
                android: baseConfig._platform,
                ios: baseConfig._platform
              }
              //,force: 'android'
            };

            new SmartBanner(bannerConfig);
          }
          catch (e) {
            console.error(e);
          }

        };

        var waiter = function(){
          if (Configuration.done()) {
            initBanner(Configuration.data());
          }
          else {
            $timeout(waiter);
          }
        };

        waiter();
      }
    };
  });
