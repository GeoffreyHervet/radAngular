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

    //if (!User.isLoggued()) {
    //  return User.goToLogin($state.href('app.cart'))
    //}

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
