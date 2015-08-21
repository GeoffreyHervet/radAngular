'use strict';

/**
 * @ngdoc service
 * @name angularApp.User
 * @description
 * # User
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('User', function (Configuration, $http, ApiLink, MagentoPostRequest, $cookies, responseHandler, $q, LocalStorage, $location, $state, Lang) {
    var cookieKey = '_token_user';
    var _token = null;
    var _anonymous;

    var goToLogin = function(backPath) {
      if (!backPath) {
        backPath = $location.path();
      }
      $cookies.remove('login/backpath');
      $cookies.put('login/backpath', backPath, 60 * 60 * 24);
      $state.go('app.auth');
    };

    var getBackPath = function(){
      var backPath = $cookies.get('login/backpath');
      console.log('backPath', backPath);
      if (backPath) {
        $cookies.remove('login/backpath');
        return backPath;
      }

      return '#/' + Lang.get();
    };

    var setToken = function(token, anonymous) {
      if (!anonymous || anonymous === undefined) {
        anonymous = 0;
      }
      _token = token;
      setAnonymous(anonymous);
      if (token) {
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

    var facebookLogin = function(code){
      if (!!(!code && (navigator.userAgent.match('CriOS') || window.devmode))){
        return $q(function(){
          var uri = encodeURIComponent(location.href.split('#')[0] + '#' + $location.path());
          var url = 'https://www.facebook.com/dialog/oauth?client_id=406695926021804&redirect_uri=' + uri + '&scope=email,user_birthday';
          LocalStorage.put('FBURIBACK', uri);
          location.href = url;
        });
      }
      if (code) {
        var data = {code: code, is_subscribed: 1, uri: LocalStorage.get('FBURIBACK')}
        return $q(function (resolve, reject) {
          MagentoPostRequest(ApiLink.get('customer', 'facebooklogin'), data, _token)
            .then(function (response) {
              if (response.data.message.status == 'error') {
                reject(response.data.message.text);
              }
              _magentoPostRequestSuccess(response);
              return resolve(response);
            }, function () {
              return reject('error.connexion_lost');
            })
        });
      }
      return $q(function(resolve, reject){
        FB.login(function(response) {
          if (response.authResponse) {
            var data = {accesstoken: response.authResponse.accessToken, is_subscribed: 1};
            return MagentoPostRequest(ApiLink.get('customer', 'facebooklogin'), data, _token)
              .then(function(response){
                if (response.data.message.status == 'error'){
                  reject(response.data.message.text);
                }
                _magentoPostRequestSuccess(response);
                return resolve(response);
              }, function(){
                return reject('error.connexion_lost');
              });
          } else {
            return reject('error.facebook_canceled');
          }
        }, {scope: 'email,user_birthday'});
      });
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
                setToken(response.data.message.token, 1);
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
      setToken(null, 1);
      return $http({
        method: 'GET',
        url: ApiLink.get('customer', 'logout'),
        headers: {
          'Authorization': 'token="' + _token + '"'
        }
      })
        .then(function(){
          setToken(null, 1);
        })
      ;
    };

    var getInfos = function(forceRefresh){
      return $q(function(resolve, reject){
        var ret = LocalStorage.getObject('customer/info');
        if (ret && !forceRefresh) {
          return resolve(ret);
        }
        return $http({
          method: 'GET',
          url: ApiLink.get('customer', 'info'),
          headers: {
            'Authorization': 'token="' + _token + '"'
          }
        })
          .then(function(response){
            if (response.data.customer) {
              ret = response.data.customer;
              LocalStorage.putObject('customer/info', ret);
              return resolve(ret);
            }
            if (response.data.message && response.data.message.logged_in === '0') {
              return goToLogin();
            }
            return reject('error.unknown_reason');
          }, function(){
            return reject('error.connexion_lost');
          })
      });
    };

    var updateNewsletter = function(val){
      return $q(function(resolve){
        MagentoPostRequest(
          ApiLink.get('customer', 'updateopt'),
          { subscribe: val ? 1 : 0 },
          _token
        ).then(function(){
            resolve();
          }, function(){
            resolve();
          })
      });
    };

    var updater = function(data, part){
      return $q(function(resolve, reject){
        MagentoPostRequest(
          ApiLink.get('customer', 'update' + part),
          data,
          _token
        ).then(function(response){
            if (response.data.message && response.data.message.status) {
              if (response.data.message.status == 'success') {
                return resolve(response.data.message.text);
              }
              return reject(response.data.message.text);
            }
            return reject('error.unknown_reason');
          }, function(){
            reject('error.connexion_lost');
          })
      });
    };

    var updateEmail = function(email, pass){
      return updater({ password: pass, email: email}, 'email');
    };

    var updateName = function(first, last){
      return updater({ firstname: first, lastname: last}, 'name');
    };

    var updatePassword = function(current, newPass){
      return updater({ password: current, update: newPass}, 'password');
    };

    var tmpValAno = parseInt($cookies.get(cookieKey + '_anonymous'));
    setToken($cookies.get(cookieKey) || null, isNaN(tmpValAno) ? 1 : tmpValAno);


    return {
      login:              login,
      logout:             logout,
      register:           save,
      forgotPassword:     forgotPassword,

      getToken:           getToken,
      isLoggued:          isLoggued,
      goToLogin:          goToLogin,
      getBackPath:        getBackPath,

      getInfos:           getInfos,
      updateNewsletter:   updateNewsletter,
      updateEmail:        updateEmail,
      updateName:         updateName,
      updatePassword:     updatePassword,

      facebookAuth:       facebookLogin
    };
  });
