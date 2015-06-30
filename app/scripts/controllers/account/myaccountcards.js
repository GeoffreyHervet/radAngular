'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountCardsCtrl
 * @description
 * # MyAccountCardsCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountCardsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
