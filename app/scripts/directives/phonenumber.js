'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:phoneNumber
 * @description
 * # phoneNumber
 */
angular.module('angularApp')
  .directive('phoneNumber', function () {
    var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();

    return {
      restrict: 'A',
      scope: {
        isValid: '=phoneNumber',
        updateIsValid:'=updator',
        model: '=ngModel',
        country: '=country'
      },
      link: function postLink(scope, element, attrs) {
        scope.$watchGroup(['model','country'], function(){
          var phoneNumber = scope.model;
          var regionCode  = scope.country;

          if (!phoneNumber && !regionCode) {
            scope.validPhone = false;
            return ;
          }

          try {
            var number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
            scope.isValid = phoneUtil.isValidNumber(number);
            scope.updateIsValid && scope.updateIsValid(scope.isValid);
            if (scope.isValid) {
              scope.model = phoneUtil.format(number, i18n.phonenumbers.PhoneNumberFormat.E164);
              element.val(scope.model);
            }
          }
          catch (e) {

          }
        });
      }
    };
  });
