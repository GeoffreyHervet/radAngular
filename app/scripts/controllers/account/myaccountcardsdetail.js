'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MyAccountCardsDetailCtrl
 * @description
 * # MyAccountCardsDetailCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MyAccountCardsDetailCtrl', function ($scope, User, $state, SavedCards, $stateParams) {
    if (!User.isLoggued()) {
      User.goToLogin();
    }

    $scope.success = null;
    $scope.loading = true;
    $scope.title = 'myaccount.profile.cards';
    $scope.card = null;

    SavedCards
      .get()
      .then(function(cards){
        $scope.error = null;
        $scope.loading = false;
        angular.forEach(cards, function(card){
          if (card.id == $stateParams.id) {
            setCard(card);
          }
        });
        if (!$scope.card){
          $scope.error = 'card.not_found';
        }
      }, function(error){
        $scope.error = error;
        $scope.loading = false;
      })
    ;

    var setCard = function(card){
      $scope.card = card;
      $scope.number = '•••• •••• •••• ' + card.number.slice(-4);
      var date = card.expire.split('/');
      var month = parseInt(date[0]);
      month = month < 10 ? '0' + month : month;
      $scope.date = month + ' / ' + (2000 + parseInt(date[1]));
    };

    $scope.deleteCard = function(){
      $scope.loading = true;
      SavedCards.delete($scope.card.id).then(function(){
        return $state.go('app.my-account.cards');
      })
    };
  });
