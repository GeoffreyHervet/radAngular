'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyordersCtrl
 * @description
 * # MyordersCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyordersCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
