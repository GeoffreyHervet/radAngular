'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:cartFooter
 * @description
 * # cartFooter
 */
angular.module('angularApp')
  .directive('cartFooter', function (Cart) {
    if (!Cart.isInit()) {
      Cart
        .refresh()
        .then(function(){
          console.log('nbProduct', Cart.getNbProduct());
        })
      ;
    }

    return {
      templateUrl: 'views/directives/cart-footer.html',
      restrict: 'E',
      link: function postLink(scope) {
        var body = angular.element('body');

        //scope.cart = Cart;
        scope.nb_product = Cart.getNbProduct();
        console.log(scope.nb_product);
        scope.$watch('Cart.getNbProduct()', function(){
          scope.nb_product = Cart.getNbProduct();

          if (scope.nb_product) {
            body.addClass('has-cart-footer');
          }
          else {
            body.removeClass('has-cart-footer');
          }
        })
      }
    };
  });
