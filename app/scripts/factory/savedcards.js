'use strict';

/**
 * @ngdoc service
 * @name angularApp.SavedCards
 * @description
 * # SavedCards
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('SavedCards', function (User, $q, $http, ApiLink, Utils, MagentoPostRequest) {
    var _get = function(){
      return $q(function(resolve, reject){
        $http({
          method: 'GET',
          url: ApiLink.get('stripe', 'savedcards'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        }).then(function(response) {
          if (response.data.message && response.data.message.logged_in === '0') {
            User.goToLogin();
          }
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

    var _delete = function(id) {
      return $q(function(resolve){
        MagentoPostRequest(
          ApiLink.get('stripe', 'savedcards'),
          {'card[0]': id},
          User.getToken()
        ).then(function() {
            return resolve();
          }, function(){
            resolve();
          })
        ;
      });
    };

    return {
      'get':    _get,
      'delete': _delete
    };
  });
