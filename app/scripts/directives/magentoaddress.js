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

        scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();
        scope.optionsAutocomplete = { country: scope.countryCode, types: 'address' };

        scope.$watch('state', function(newV){
          scope.setState(newV);
        });
        var st = '' + scope.state;
        scope.updateState = function(state) {
          scope.state = state;
        };

        scope.updateCountry = function(value){
          if (value) {
            scope.country = value;
          }
          if (!scope.country) {
            return ;
          }

          scope.countryCode = ((typeof scope.country == 'object') ? scope.country._code : scope.country).toLowerCase();

          scope.optionsAutocomplete = {
            country: scope.countryCode,
            types: 'address'
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
            scope.states = config.states.state;
            angular.forEach(scope.states, function(st){
              if (scope.state == st._code) {
                scope.state = st;
              }
            });
          }
          if (config.allowed_countries && config.allowed_countries.country) {
            scope.countries = Utils.arrayfy(config.allowed_countries.country);
            angular.forEach(scope.countries, function(v,k){
              scope.countries[k].__text = '> ' + v.__text;
            });
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

        var getComponentAutocompleteValue = function(searchedType, short) {
          var ret = null;
          if (scope.detailsAutocomplete) {
            angular.forEach(scope.detailsAutocomplete.address_components, function(item){
              if (!ret) {
                angular.forEach(item.types, function (type) {
                  if (searchedType == type) {
                    ret = (short === true) ? item.short_name : item.long_name;
                  }
                });
              }
            });
          }
          return ret;
        };

        scope.$watch('detailsAutocomplete', function(){
          if (scope.detailsAutocomplete && scope.detailsAutocomplete.address_components) {
            scope.setState(getComponentAutocompleteValue('administrative_area_level_1', true));

            var nb = getComponentAutocompleteValue('street_number');
            scope.street1  = '';
            scope.street   = (nb ? nb + ' ' : '') + getComponentAutocompleteValue('route');
            scope.postcode = getComponentAutocompleteValue('postal_code');
            scope.city     = getComponentAutocompleteValue('locality') ? getComponentAutocompleteValue('locality') : getComponentAutocompleteValue('sublocality_level_1');
          }
        });

        scope.setState = function(stateCode) {
          if (typeof stateCode === 'object') {
            return ;
          }
          if (stateCode) {
            if (stateCode && scope.states && scope.states.length) {
              stateCode = stateCode.toUpperCase();
              angular.forEach(scope.states, function(st){
                if (stateCode == st._code) {
                  scope.state = st;
                  $timeout(function(){
                    angular.element('#state-list').val(st._code).focus().change().blur();
                  });
                }
              });
            }
          }
        };

        $timeout(function() {
          Configuration.reload(configCountry);
          //
          Configuration.done();
          Configuration.data();
          //
          if (Configuration.done()) {
            configCountry(Configuration.data());
          }
        });
      }
    };
  });
