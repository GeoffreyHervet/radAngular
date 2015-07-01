'use strict';

/**
 * @ngdoc service
 * @name angularApp.Cms
 * @description
 * # Cms
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Cms', function (LocalStorage, $http, $q, ApiLink) {
    var _get = function(slug){
      return $q(function(resolve, reject){
        var ret = LocalStorage.get('page/' + slug);
        if (ret) {
          return resolve(ret);
        }

        return $http
          .get(ApiLink.get('cms', 'page', {id: slug}))
          .then(function(response){
            ret = response.data;
            LocalStorage.put('page/' + slug, ret, 3600 * 24);
            return resolve(ret);
          }, function(){
            return reject('error.connexion_lost');
          })
        ;
      });
    };

    return {
      'get': _get
    };
  });
