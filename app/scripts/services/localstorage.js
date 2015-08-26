'use strict';

/**
 * @ngdoc service
 * @name angularApp.localStorage
 * @description
 * # localStorage
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('LocalStorage', function (Utils) {
    var lS = window.localStorage;
    var lifeTime = 60 * 10;

    var _get = function(key) {
      var time = parseInt(lS.getItem(key + '_time'));
      if (time < Utils.getTimestamp()) {
        remove(key);
        return null;
      }

      return lS.getItem(key);
    };

    var put = function(key, obj, lifeT){
      try {
        lifeT = lifeT || lifeTime;
        lS.setItem(key + '_time', Utils.getTimestamp() + lifeT);
        lS.setItem(key, obj);
      } catch (e) {
        clear();
      }
    };

    var getObject = function(key) {
      var ret = _get(key);
      if (ret) {
        try {
          return JSON.parse(ret);
        } catch (e) {
          ret = null;
        }
      }
      return ret;
    };

    var putObject = function(key, obj, lifeT){
      lifeT = lifeT || lifeTime;
      put(key, JSON.stringify(obj), lifeT);
    };

    var clear = function() {
      console.log('Clear');
      lS.clear();
    };

    var remove = function(key) {
      lS.removeItem(key + '_time');
      lS.removeItem(key);
    };


    return {
      'get': _get,
      'put': put,
      'getObject': getObject,
      'putObject': putObject,
      'clear': clear,
      'remove': remove
    }
  });
