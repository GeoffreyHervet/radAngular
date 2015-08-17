'use strict';

/**
 * @ngdoc service
 * @name angularApp.Configuration
 * @description
 * # Configuration
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Configuration', function ($rootScope, ApiLink, $q, $http, Lang, $timeout) {
    var initDone        = false;
    var initInProgress  = false;
    var getPromise      = $q.defer();
    var data            = {};

    var init = function() {
      initDone = false;
      initInProgress = true;
      $http.get(ApiLink.get('init', 'init', {'country': Lang.get()})).then(function (response) {
        data = response.data.init;
        console.log('data', data);
        getPromise.resolve(data);
      }, function () {
        initInProgress = false;
        getPromise.reject();
      })
    };

    Lang.onChange(function(){
      initInProgress = false;
      initDone = false;
      init();
    });

    $timeout(function(){
      if (!initInProgress && !initDone) {
        init();
      }
    }, 0);

    return {
      done: function(){ return initDone; },
      initInProgress: function() { return initInProgress; },
      data: function(){ return data; },
      promise: getPromise.promise
    };
  });
