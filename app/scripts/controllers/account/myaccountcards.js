'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountCardsCtrl
 * @description
 * # MyAccountCardsCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountCardsCtrl', function ($scope, User, SavedCards) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.success = null;
    $scope.loading = true;
    $scope.title = 'myaccount.profile.cards';
    $scope.cards = [];

    SavedCards
      .get()
      .then(function(cards){
        $scope.error = null;
        $scope.loading = false;
        $scope.cards = cards;
      }, function(error){
        $scope.error = error;
        $scope.loading = false;
      })
    ;

    $scope.format = function(card){
      return card.type + ' ' + card.number.slice(-4);
    };
  });
