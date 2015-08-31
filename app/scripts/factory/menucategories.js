'use strict';

/**
 * @ngdoc service
 * @name angularApp.MenuCategories
 * @description
 * # MenuCategories
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('MenuCategories', function ($http, $q, LocalStorage, ApiLink) {
    var cookieKey = 'MenuCategories';
    var lifeTime = 60 * 60;
    var _categories = null;

    var getTimestamp = function() {
      return Math.floor(Date.now() / 1000) | 0;
    };

    var getCookieValue = function() {
      var value = LocalStorage.getObject(cookieKey + '_val');
      if (value) {
        var time = parseInt(LocalStorage.get(cookieKey + '_time'));
        if (time < getTimestamp()) {
          LocalStorage.remove(cookieKey + '_val');
        }
        else {
          _categories = value;
          return value;
        }
      }
      return null;
    };

    var clearVal = function(val) {
      var tmp = {};
      angular.forEach(val.category, function(category,idx){
        tmp[idx+'-'+category.entity_id] = {n:category.name, c: {}};
        if (category.children) {
          angular.forEach(category.children.category, function(child,idx2){
            tmp[idx+'-'+category.entity_id]['c'][idx2+'-'+child.entity_id] = child.name;
          });
        }
      });
      return tmp;
    };

    var setCookieValue = function(val) {
      val = clearVal(val);
      _categories = val;
      LocalStorage.putObject(cookieKey + '_val', val);
      LocalStorage.put(cookieKey + '_time', getTimestamp() + lifeTime);
      return val;
    };

    var getCategories = function(){
      return $q(function(resolve, reject) {
        var categories = getCookieValue();

        if (categories) {
          return resolve(categories);
        }

        $http
          .get(ApiLink.getApiBase() + '/raaad_xmlconnect/index/index/app_code/' + ApiLink.getAppCode() + '/level/3')
          .then(function(response) {
            if (response.data
                && response.data.home
                && response.data.home.categorytree) {
              categories = response.data.home.categorytree;
              resolve(setCookieValue(categories));
            }
            else {
              reject(null);
            }
          }, function() {
            reject(null);
          })
        ;
      });
    };

    // Public API here
    return function() {
      return getCategories();
    };
  });
