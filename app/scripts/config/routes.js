'use strict';

angular
  .module('angularApp')
  .config(function ($routeProvider) {
    // TODO refactorize it : controllers/auth/routes.js controllers/account/routes.js ....
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl'
      })
      .when('/connexion', {
        templateUrl: 'views/auth/connexion.html',
        controller: 'ConnexionCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/auth/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/lost-password', {
        templateUrl: 'views/auth/lost-password.html',
        controller: 'LostPasswordCtrl'
      })

      .when('/my-account/orders', {
        templateUrl: 'views/account/my-orders.html',
        controller: 'MyOrdersCtrl'
      })

      .when('/my-account/profile', {
        templateUrl: 'views/account/profile.html',
        controller: 'MyAccountProfileCtrl'
      })
      .when('/my-account/profile/email', {
        templateUrl: 'views/account/email.html',
        controller: 'MyAccountProfileEmailCtrl'
      })
      .when('/my-account/profile/password', {
        templateUrl: 'views/account/password.html',
        controller: 'MyAccountProfilePasswordCtrl'
      })
      .when('/my-account/cards', {
        templateUrl: 'views/account/cards.html',
        controller: 'MyAccountCardsCtrl'
      })
      .when('/my-account/card/:id', {
        templateUrl: 'views/account/card-detail.html',
        controller: 'MyAccountCardsDetailCtrl'
      })
      .when('/my-account/addresses', {
        templateUrl: 'views/account/addresses.html',
        controller: 'MyAccountAddressesCtrl'
      })
      .when('/my-account/address/add', {
        templateUrl: 'views/account/address-add.html',
        controller: 'MyAccountAddressesAddCtrl'
      })
      .when('/my-account/address/edit/:id', {
        templateUrl: 'views/account/address-edit.html',
        controller: 'MyAccountAddressesEditCtrl'
      })
      .when('/my-account/free-orders', {
        templateUrl: 'views/account/free-orders.html',
        controller: 'MyAccountFreeOrdersCtrl'
      })

      .when('/help', {
        templateUrl: 'views/pages/help.html',
        controller: 'PageHelpCtrl'
      })
      .when('/search', {
        templateUrl: 'views/store/category.html',
        controller: 'SearchCtrl'
      })
      .when('/page/:slug', {
        templateUrl: 'views/pages/cms.html',
        controller: 'CmsPageCtrl'
      })

      .when('/my-account/order/:num/:id', {
        templateUrl: 'views/account/order-recap.html',
        controller: 'OrderRecapCtrl'
      })
      .when('/category/:categoryslug', {
        templateUrl: 'views/store/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/product/:productslug', {
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/store/cart.html',
        controller: 'CartCtrl'
      })
      .when('/cart/edit/:itemId', {
        templateUrl: 'views/cart/edit.html',
        controller: 'CartEditCtrl'
      })
      .when('/cart/delivery-address-list', {
        templateUrl: 'views/cart/delivery-address-list.html',
        controller: 'CartDeliveryAddressListCtrl'
      })
      .when('/cart/delivery-address-create', {
        templateUrl: 'views/cart/delivery-address-create.html',
        controller: 'CartCreateDeliveryAddressCtrl'
      })
      .when('/cart/billing-address-list', {
        templateUrl: 'views/cart/billing-address-list.html',
        controller: 'CartBillingAddressListCtrl'
      })
      .when('/cart/billing-address-create', {
        templateUrl: 'views/cart/billing-address-create.html',
        controller: 'CartCreateBillingAddressCtrl'
      })
      .when('/cart/payment', {
        templateUrl: 'views/cart/payment-list.html',
        controller: 'CartPaymentListCtrl'
      })
      .when('/cart/payment-add', {
        templateUrl: 'views/cart/payment-add.html',
        controller: 'CartPaymentAddCtrl'
      })
      .when('/cart/confirmation', {
        templateUrl: 'views/cart/confirm.html',
        controller: 'CartConfirmCtrl'
      })
      .when('/success', {
        templateUrl: 'views/cart/success.html',
        controller: 'SuccessCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
