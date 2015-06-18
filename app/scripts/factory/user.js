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

    var setToken = function (token) {
      _token = token;
      if (token) {
        $cookies.put(cookieKey, token);
        $cookies.put(cookieKey + '_anonymous', _anonymous ? 1 : 0);
        $http.defaults.headers.common.Authorization = 'token="' + token + '"';
      }
      else {
        $cookies.remove(cookieKey);
        $cookies.remove(cookieKey + '_anonymous');
        setAnonymous(true);
        delete $http.defaults.headers.common.Authorization;
      }
    };

    var _getTokenAnonymous = function() {
      return $q(function(resolve, reject) {
        $http
          .get(ApiLink.getApiBase() + '/raaad_xmlconnect/customer/token/app_code/' + ApiLink.getAppCode())
          .then(function(response) {
            console.log('ICI', response.data.message.token);
            if (response.data.message.token) {
              setToken(response.data.message.token);
              setAnonymous(true);
              return resolve(_token);
            }
            reject(null);
          }, function(){
            reject(null);
          })
      });
    };

    var getToken = function (requiredAndAsynchronous) {
      if (requiredAndAsynchronous) {
        if (_token) {
          return $q(function(accept){
            accept(_token);
          });
        }
        return _getTokenAnonymous();
      }
      if (_token) {
        return _token;
      }
      return '';
    };

    var setAnonymous = function(val){
      _anonymous = !!val;
    };

    var isAnonymous = function() {
      return _anonymous;
    };

    var _magentoPostRequestSuccess = function(response) {
      return responseHandler.success(response, function(response) {
        if (response.data.message.token) {
          setToken(response.data.message.token);
          setAnonymous(false);
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
        .then(setToken(null))
      ;
    };

    setToken($cookies.get(cookieKey) || null);
    setAnonymous((!!$cookies.get(cookieKey + '_anonymous')) || true);

    return {
      login:          login,
      logout:         logout,
      register:       save,
      forgotPassword: forgotPassword,

      getToken:       getToken,
      isAnonymous:    isAnonymous
    };
  });
