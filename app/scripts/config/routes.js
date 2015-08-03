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
      .state('app.auth.lost-password', {
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
