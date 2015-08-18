'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:magentoAddress
 * @description
 * # magentoAddress
 */
angular.module('angularApp')
  .directive('magentoAddress', function (Configuration, Utils, $timeout) {
    return {
      templateUrl: 'views/directives/magento-address.html',
      restrict: 'E',
      scope: {
        firstname: '=',
        lastname: '=',
        street: '=',
        street1: '=',
        city: '=',
        postcode: '=',
        telephone: '=',
        state: '=',
        country: '=',
        validPhone: '=',
        updator: '='
      },
      link: function postLink(scope, element, attrs) {
        var firstLoad = true;
        scope.states     = null;
        scope.countries  = null;
        scope.detailsAutocomplete = {};

        console.log(scope.country);
        scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
        scope.optionsAutocomplete = { country: scope.countryCode };

        scope.updateCountry = function(value){
          if (value) {
            scope.country = value;
          }
          if (!scope.country) {
            return ;
          }

          scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
          console.log('scope.countryCode =', scope.countryCode);

          scope.optionsAutocomplete = {
            country: scope.countryCode
          };

          if (firstLoad) {
            firstLoad = false;
            return ;
          }

          scope.street     = '';
          scope.street1    = '';
          scope.city       = '';
          scope.postcode   = '';
        };

        var configCountry = function(config) {
          if (config.states && config.states.state) {
            if (!scope.state) {
              scope.state = 'NY';
            }
            scope.states = config.states.state;
            angular.forEach(scope.states, function(st){
              if (scope.state == st._code) {
                scope.state = st;
              }
            });
          }
          if (config.allowed_countries && config.allowed_countries.country) {
            scope.countries = Utils.arrayfy(config.allowed_countries.country);
            angular.forEach(scope.countries, function(country){
              if (scope.country == country._code) {
                scope.country = country;
              }
            });
            if (scope.countries.length < 2) {
              scope.country = scope.countries[0];
            }

            scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
          }
        };

        var getComponentAutocompleteValue = function(searchedType) {
          var ret = null;
          if (scope.detailsAutocomplete) {
            angular.forEach(scope.detailsAutocomplete.address_components, function(item){
              if (!ret) {
                angular.forEach(item.types, function (type) {
                  if (searchedType == type) {
                    ret = item.long_name;
                  }
                });
              }
            });
          }
          return ret;
        };

        scope.$watch('detailsAutocomplete', function(){
          if (scope.detailsAutocomplete && scope.detailsAutocomplete.address_components) {
            scope.street1  = '';
            scope.street   = getComponentAutocompleteValue('street_number') + ' ' + getComponentAutocompleteValue('route');
            scope.postcode = getComponentAutocompleteValue('postal_code');
            scope.city     = getComponentAutocompleteValue('locality');
          }
        });


        $timeout(function() {
          if (Configuration.done()) {
            configCountry(Configuration.data());
          }
          else {
            if (Configuration.initInProgress()) {
              console.log(Configuration.promise);
              Configuration.promise.then(configCountry);
            }
          }
        });
      }
    };
  });
