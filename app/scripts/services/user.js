'use strict';

/**
 * @ngdoc service
 * @name angularApp.User
 * @description
 * # User
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .service('User', function ($http, $q, ApiLink, MagentoPostRequest, $cookies) {
    var cookieKey = '_token_user';
    var _token = $cookies.get(cookieKey) || null;

    var setToken = function(token) {
      _token = token;
      if (token) {
        $cookies.put(cookieKey, token);
        $http.defaults.headers.common.Authorization = 'token="' + token + '"';
      }
      else {
        $cookies.remove(cookieKey);
        delete $http.defaults.headers.common.Authorization;
      }
    };

    var login = function(user, pass){
      return MagentoPostRequest(ApiLink.get('customer', 'login'), {username: user, password: pass}, _token)
        .then(function(response) {
          if (typeof response.data === 'object') {
            if (response.data.message.token) {
              setToken(response.data.message.token);
            }
            return response.data;
          } else {
            return $q.reject(response.data);
          }

        }, function(response) {
          return $q.reject(response.data);
        });

    };

    var logout = function(){
      console.log('ICI');
      return $http({
        method: 'GET',
        url: ApiLink.get('customer', 'logout'),
        headers: {
          'Authorization': 'token="' + _token + '"'
        }
      })
        .then(setToken(null))
      ;
    };

    return {
      login:  login,
      logout: logout
    };
  });
