'use strict';

angular
  .module('angularApp')
  .config(function ($stateProvider) {
    var forceSSL = function () {
      if (location.protocol !== 'https:') {
        window.location.href = location.href.replace('http', 'https');
      }
    };
    if (location.host == 'm.rad.co' || location.hostname == 'm.rad.co') {
      forceSSL();
    }

    $stateProvider.state('test', {
      url: '/',
      template: '<ui-view/>',
      controller: 'RootCtrl'
    });
    $stateProvider.state('app', {
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
      //.state('app.auth', {
      //url: '',
      //templateUrl: 'views/auth/login.html',
      //controller: 'LoginCtrl'
      //})

      .state('app.auth', {
        url: '/auth',
        templateUrl: 'views/auth/connexion.html',
        controller: 'ConnexionCtrl'
      })
      .state('app.auth.logout', {
        url:  '/logout',
        templateUrl: 'views/auth/logout.html',
        controller: 'LogoutCtrl'
      })
      .state('app.auth.register', {
        url: '/register',
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .state('app.auth.lost-password', {
        url: '/lost-password',
        templateUrl: 'views/auth/lost-password.html',
        controller: 'LostPasswordCtrl'
      })
      .state('app.my-account',{
        url: '/my-account',
        templateUrl: 'views/account/profile.html',
        controller: 'MyAccountProfileCtrl'
      })
      .state('app.my-account.orders', {
        url: '/order',
        templateUrl: 'views/account/my-orders.html',
        controller: 'MyOrdersCtrl'
      })
      .state('app.my-account.orders.show', {
        url: '/:num/:id',
        templateUrl: 'views/account/order-recap.html',
        controller: 'OrderRecapCtrl'
      })
      .state('app.my-account.email', {
        url: '/email',
        templateUrl: 'views/account/email.html',
        controller: 'MyAccountProfileEmailCtrl'
      })
      .state('app.my-account.password', {
        url: '/password',
        templateUrl: 'views/account/password.html',
        controller: 'MyAccountProfilePasswordCtrl'
      })
      .state('app.my-account.cards', {
        url: '/cards',
        templateUrl: 'views/account/cards.html',
        controller: 'MyAccountCardsCtrl'
      })
      .state('app.my-account.cards.show', {
        url: '/:id',
        templateUrl: 'views/account/card-detail.html',
        controller: 'MyAccountCardsDetailCtrl'
      })
      .state('app.my-account.addresses', {
        url: '/addresses',
        templateUrl: 'views/account/addresses.html',
        controller: 'MyAccountAddressesCtrl'
      })
      .state('app.my-account.addresses.add', {
        url: '/add',
        templateUrl: 'views/account/address-add.html',
        controller: 'MyAccountAddressesAddCtrl'
      })
      .state('app.my-account.addresses.edit', {
        url: '/:id',
        templateUrl: 'views/account/address-edit.html',
        controller: 'MyAccountAddressesEditCtrl'
      })
      .state('app.my-account.free-orders', {
        url: '/free-orders',
        templateUrl: 'views/account/free-orders.html',
        controller: 'MyAccountFreeOrdersCtrl'
      })
      .state('app.page', {
        url: '/page/:slug',
        templateUrl: 'views/pages/cms.html',
        controller: 'CmsPageCtrl'
      })
      .state('app.store.search', {
        url: '/search?q',
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
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.store.search.product', {
        url: '/:productslug',
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .state('app.store.category.product.info', {
        url: '/info',
        templateUrl: 'views/store/product-info.html',
        controller: 'ProductInfoCtrl'
      })
      .state('app.store.search.product.info', {
        url: '/info',
        templateUrl: 'views/store/product-info.html',
        controller: 'ProductInfoCtrl'
      })
      .state('app.cart', {
        url: '/cart',
        templateUrl: 'views/store/cart.html',
        controller: 'CartCtrl'
      })
      .state('app.cart.edit', {
        url: '/edit/:itemId',
        templateUrl: 'views/cart/edit.html',
        controller: 'CartEditCtrl'
      })
      .state('app.cart.delivery', {
        url: '/delivery',
        templateUrl: 'views/cart/delivery-address-list.html',
        controller: 'CartDeliveryAddressListCtrl'
      })
      .state('app.cart.delivery.new', {
        url: '/new',
        templateUrl: 'views/cart/delivery-address-create.html',
        controller: 'CartCreateDeliveryAddressCtrl'
      })
      .state('app.cart.billing', {
        url: '/billing',
        templateUrl: 'views/cart/billing-address-list.html',
        controller: 'CartBillingAddressListCtrl'
      })
      .state('app.cart.billing.new', {
        url: '/new',
        templateUrl: 'views/cart/billing-address-create.html',
        controller: 'CartCreateBillingAddressCtrl'
      })
      .state('app.cart.payment', {
        url: '/payment',
        templateUrl: 'views/cart/payment-list.html',
        controller: 'CartPaymentListCtrl'
      })
      .state('app.cart.payment.add', {
        url: '/add',
        templateUrl: 'views/cart/payment-add.html',
        controller: 'CartPaymentAddCtrl'
      })
      .state('app.cart.confirm', {
        url: '/confirmation',
        templateUrl: 'views/cart/confirm.html',
        controller: 'CartConfirmCtrl'
      })
      .state('app.cart.success', {
        url: '/success',
        templateUrl: 'views/account/order-recap.html',
        controller: 'SuccessCtrl'
      })
  })
;
