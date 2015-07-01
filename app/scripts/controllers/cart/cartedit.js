'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CartEditCtrl
 * @description
 * # CartEditCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CartEditCtrl', function ($scope, User, Cart, $routeParams, Product, $location) {
    console.log(User.isLoggued());

    if (!User.isLoggued()) {
      return User.goToLogin('/cart');
    }

    $scope.title      = 'cart.edit_product';
    $scope.loading    = true;
    $scope.error      = false;

    console.log($routeParams.itemId);
    Cart.getDetails().then(function(){
      angular.forEach(Cart.getFormattedDetails().items, function(cartItem){
        if (cartItem.item_id == $routeParams.itemId) {
          $scope.item = cartItem;
          $scope.item.qty = parseInt($scope.item.qty);

          console.log($scope.item);
          Product
            .get(cartItem.entity_id)
            .then(function(product){
              $scope.product = product;
              $scope.options  = Array.isArray(product.product.options.option) ? product.product.options.option : [product.product.options.option];
              if (!product.product.options.option) {
                $scope.options = [];
              }
              if ($scope.options.length) {
                angular.forEach($scope.options, function (option) {
                  if (option.value.length) {
                    angular.forEach(option.value, function (val) {
                      if ($scope.item.options.length && $scope.item.options.option.length) {
                        angular.forEach($scope.item.options.option, function (productOpt) {
                          val.active = (val._label == productOpt._text && productOpt._label == option._label);
                        });
                      }
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
      console.log('ICI');
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
          return $location.path('/cart');
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
        .then(function(message){
          return $scope.removeItem();
          console.log('OK');
        }, function(error){
          $scope.error = error || 'error.connexion_lost';
          $scope.loading = false;
        })
      ;
    };

    $scope.removeItem = function(){
      $scope.loading    = true;
      Cart
        .removeItem($scope.item.entity_id)
        .then(function(){
          return $location.path('/cart');
        })
        .then(function(error){
          $scope.error = error;
          $scope.loading = false;
        })
      ;
    };

  });
