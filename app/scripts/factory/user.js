'use strict';

/**
 * @ngdoc service
 * @name angularApp.User
 * @description
 * # User
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('User', function ($http, ApiLink, MagentoPostRequest, $cookies, responseHandler, $q) {
    var cookieKey = '_token_user';
    var _token, _anonymous;

    var setToken = function(token) {
      _token = token;
      if (token) {
        setAnonymous(0);
        $cookies.put(cookieKey, token);
        $http.defaults.headers.common.Authorization = 'token="' + token + '"';
      }
      else {
        $cookies.remove(cookieKey);
        $cookies.remove(cookieKey + '_anonymous');
        delete $http.defaults.headers.common.Authorization;
      }
    };


    var setAnonymous = function(val) {
      _anonymous = !!val;
      $cookies.remove(cookieKey + '_anonymous');
      $cookies.put(cookieKey + '_anonymous', val);
    };

    var isLoggued = function(){
      return !_anonymous;
    };

    var _magentoPostRequestSuccess = function(response) {
      return responseHandler.success(response, function(response) {
        if (response.data.message.token) {
          setToken(response.data.message.token);
        }
      });
    };

    var login = function(user, pass){
      return MagentoPostRequest(ApiLink.get('customer', 'login'), {username: user, password: pass}, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var save = function(data){
      return MagentoPostRequest(ApiLink.get('customer', 'save'), data, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var getToken = function(requiredAndAsynchronousToken){
      if (requiredAndAsynchronousToken) {
        return $q(function(resolve, reject){
          if (_token) {
            return resolve(_token + '');
          }
          return $http
            .get(ApiLink.get('customer', 'token'))
            .then(function(response){
              if (response.data.message) {
                setToken(response.data.message.token);
                setAnonymous(1);
                return resolve(response.data.message.token);
              }
              reject(null);
            }, function(){
              return reject(null);
            })
          ;
        });
      }
      return (_token || '') + '';
    };

    var forgotPassword = function(email){
      return MagentoPostRequest(ApiLink.get('customer', 'forgotpassword'), {email: email}, _token)
        .then(_magentoPostRequestSuccess, responseHandler.error);
    };

    var logout = function(){
      return $http({
        method: 'GET',
        url: ApiLink.get('customer', 'logout'),
        headers: {
          'Authorization': 'token="' + _token + '"'
        }
      })
        .then(function(){
          setToken(null);
          setAnonymous(1);
        })
      ;
    };

    setToken($cookies.get(cookieKey) || null);
    var tmpValAno = parseInt($cookies.get(cookieKey + '_anonymous'));
    setAnonymous(isNaN(tmpValAno) ? 1 : tmpValAno);


    return {
      login:          login,
      logout:         logout,
      register:       save,
      forgotPassword: forgotPassword,

      getToken:       getToken,
      isLoggued:      isLoggued
    };
  });
