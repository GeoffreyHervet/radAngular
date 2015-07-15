'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ProductCtrl', function ($scope, $routeParams, $location, Product, Cart, $timeout, Utils) {
    $scope.productId  = parseInt($routeParams.productslug);
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
          $scope.images.push(img.file._url);
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
          $scope.loading = false;
          $scope.error = false;
          $scope.success = message;
          $scope.addedToCard = true;
          $timeout(function(){
            $scope.success = null;
          }, 5000);
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
      $location.path('/product-info/' + $scope.product.entity_id + '-' + Utils.slugify($scope.product.name));
    };

  });
