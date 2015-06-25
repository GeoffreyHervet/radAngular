'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductCtrl', function ($scope, $routeParams, $location, Product, Cart, $timeout) {
    $scope.productId  = parseInt($routeParams.productslug);
    $scope.title      = 'global.loading';

    $scope.loading  = true;
    $scope.error    = false;
    $scope.product  = null;
    $scope.images   = [];
    $scope.options  = [];
    $scope.quantity = 1;

    Product
      .get($scope.productId)
      .then(function(product){
        $scope.loading  = false;
        $scope.product  = product;
        $scope.images   = ['http://geoffrey.pro/img2.png', 'http://geoffrey.pro/img1.png'];
        $scope.title    = product.name;
        $scope.options  = Array.isArray(product.product.options.option) ? product.product.options.option : [product.product.options.option];
        if (!product.product.options.option) {
          $scope.options = [];
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

    $scope.addError = null;

    $scope.addToCart = function() {
      $scope.success    = null;
      $scope.addError   = null;
      $scope.loading    = true;
      Cart
        .addProduct($scope.productId, $scope.quantity, serializedOptions())
        .then(function(message){
          $scope.loading = false;
          $scope.error = false;
          $scope.success = message;
          $timeout(function(){
            $scope.success = null;
          }, 5000);
        }, function(error){
          $scope.addError = error || 'error.connexion_lost';
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

  });
