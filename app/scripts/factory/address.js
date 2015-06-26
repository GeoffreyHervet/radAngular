'use strict';

/**
 * @ngdoc service
 * @name angularApp.Address
 * @description
 * # Address
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Address', function ($http, $q, ApiLink, LocalStorage, User) {
    var cacheKey = 'checkout/address';

    var getAddresses = function(){
      return $q(function(resolve, reject){
        var ret = LocalStorage.getObject(cacheKey);
        if (ret) {
          return resolve(ret);
        }
        $http({
          method: 'GET',
          url: ApiLink.get('checkout', 'address'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        })
          .then(function(response){
            if (response.data.message) {
              return reject(response.data.message.text);
            }
            if (response.data.addresses) {
              ret = response.data.addresses;
              LocalStorage.putObject(cacheKey, ret, 600);
              return resolve(ret);
            }
            return reject('error.connexion_lost');
          }, function(){
            return reject('error.connexion_lost');
          })
        ;
      })
    };

    return {
      getAddresses: getAddresses
    };
  });
