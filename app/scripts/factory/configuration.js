'use strict';

/**
 * @ngdoc service
 * @name angularApp.Configuration
 * @description
 * # Configuration
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Configuration', function ($rootScope, ApiLink, $q, $http, $timeout, Lang) {
    var initDone        = false;
    var initInProgress  = false;
    var getPromise      = $q.defer();
    var data            = {};
    var reloadCb        = null;

    var init = function() {
      initDone = false;
      initInProgress = true;
      $http.get(ApiLink.get('init', 'init', {'country': Lang.get()})).then(function (response) {
        data = response.data.init;
        initDone = true;
        getPromise.resolve(data);
        if (reloadCb) {
          reloadCb(data);
        }
      }, function () {
        initInProgress = false;
        getPromise.reject();
      })
    };

    var reload = function(cb) {
      if (cb) {
        reloadCb = cb;
        return data;
      }
      initInProgress = false;
      initDone = false;
      init();
    };

    $timeout(function(){
      if (!initInProgress && !initDone) {
        init();
      }
    }, 0);

    return {
      done: function(){ return initDone; },
      initInProgress: function() { return initInProgress; },
      data: function(){ return data; },
      promise: getPromise.promise,
      reload: reload
    };
  });
