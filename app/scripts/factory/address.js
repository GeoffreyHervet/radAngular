'use strict';

/**
 * @ngdoc service
 * @name angularApp.Address
 * @description
 * # Address
 * Factory in the angularApp.
 */
angular.module('angularApp')
  .factory('Address', function ($http, $q, ApiLink, LocalStorage, User, MagentoPostRequest, Utils) {
    var cacheKey = 'checkout/address';

    var getAddresses = function (forceReload) {
      return $q(function (resolve, reject) {
        var ret = LocalStorage.getObject(cacheKey);
        if (ret && forceReload !== true) {
          return resolve(ret);
        }
        $http({
          method: 'GET',
          url: ApiLink.get('checkout', 'address'),
          headers: {
            Authorization: 'token="' + User.getToken() + '"'
          }
        })
          .then(function (response) {
            if (response.data.message) {
              return reject(response.data.message.text);
            }
            if (response.data.addresses) {
              ret = [];
              if (response.data.addresses.item) {
                ret = Utils.arrayfy(response.data.addresses.item);
              }
              LocalStorage.putObject(cacheKey, ret, 600);
              return resolve(ret);
            }
            return reject('error.connexion_lost');
          }, function () {
            return reject('error.connexion_lost');
          })
        ;
      })
    };

    var add = function (data, isBilling) {
      return MagentoPostRequest(
        ApiLink.get('checkout', 'saveshippingaddress'),
        data,
        User.getToken()
      );
    };

    return {
      getAddresses: getAddresses,
      add:          add
    };
  });
