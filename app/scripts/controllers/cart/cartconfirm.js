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
