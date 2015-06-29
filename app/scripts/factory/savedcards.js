'use strict';

/**
 * @ngdoc service
 * @name angularApp.SavedCards
 * @description
 * # SavedCards
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('SavedCards', function (User, $q, $http, ApiLink, Utils) {
    var _get = function(){
      return $q(function(resolve, reject){
        $http({
          method: 'GET',
          url: ApiLink.get('stripe', 'savedcards'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        }).then(function(response) {
          if (response.data.savedcards && response.data.savedcards.savedcard) {
            return resolve(Utils.arrayfy(response.data.savedcards.savedcard));
          }
          return resolve([]);
        }, function(){
          reject('error.connexion_lost');
        })
        ;
      });
    };

    return {
      'get':    _get
    };
  });
