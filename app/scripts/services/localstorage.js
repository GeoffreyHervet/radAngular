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

    var _get = function(key, lifeT) {
      lifeT = lifeT || lifeTime;
      var time = parseInt(lS.getItem(key + '_time'));
      if (time < Utils.getTimestamp() + lifeT) {
        remove(key);
        return null;
      }

      return lS.getItem(key);
    };

    var put = function(key, obj, lifeT){
      lifeT = lifeT || lifeTime;
      lS.setItem(key + '_time', Utils.getTimestamp() + lifeT);
      lS.setItem(key, obj);
    };

    var getObject = function(key, lifeT) {
      var ret = _get(key, lifeT);
      if (ret) {
        return JSON.parse(ret);
      }
      return ret;
    };

    var putObject = function(key, obj, lifeT){
      lifeT = lifeT || lifeTime;
      put(key, JSON.stringify(obj), lifeT);
    };

    var clear = function() {
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
