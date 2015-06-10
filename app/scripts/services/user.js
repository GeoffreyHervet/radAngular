'use strict';

/**
 * @ngdoc service
 * @name angularApp.User
 * @description
 * # User
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('User', function ($http, $q, ApiLink, MagentoPostRequest) {
    var login = function(user, pass){
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      console.log('customer/login', ApiLink.get('customer', 'login'));
      var data = {
        username: user,
        password: pass
      };

      return MagentoPostRequest(ApiLink.get('customer', 'login'), data)
        .then(function(response) {
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            return $q.reject(response.data);
          }

        }, function(response) {
          return $q.reject(response.data);
        });

    };
    return {
      login: login
    };
  });
