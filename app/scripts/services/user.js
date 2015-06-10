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

    var _magentoPostRequestSuccess = function(response) {
      if (typeof response.data === 'object') {
        if (response.data.message.token) {
          setToken(response.data.message.token);
        }
        return response.data;
      } else {
        return $q.reject(response.data);
      }
    };
    var _magentoPostRequestError = function(response) {
      return $q.reject(response.data);
    };

    var login = function(user, pass){
      return MagentoPostRequest(ApiLink.get('customer', 'login'), {username: user, password: pass}, _token)
        .then(_magentoPostRequestSuccess, _magentoPostRequestError);
    };

    var save = function(data){
      return MagentoPostRequest(ApiLink.get('customer', 'save'), data, _token)
        .then(_magentoPostRequestSuccess, _magentoPostRequestError);
    };


    var forgotPassword = function(email){
      return MagentoPostRequest(ApiLink.get('customer', 'forgotpassword'), {email: email}, _token)
        .then(_magentoPostRequestSuccess, _magentoPostRequestError);
    };

    var logout = function(){
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
      login:          login,
      logout:         logout,
      register:       save,
      forgotPassword: forgotPassword
    };
  });
