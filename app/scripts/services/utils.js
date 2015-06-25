'use strict';

/**
 * @ngdoc service
 * @name angularApp.utils
 * @description
 * # utils
 * Service in the angularApp.
 */
angular.module('angularApp')
  .service('Utils', function () {
    var slugify = function(str) {
      if (!str) return '';
      return str.toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    };

    var isEmpty = function(obj) {

      if (obj == null) return true;

      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;

      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }

      return true;
    };

    var getTimestamp = function() {
      return Math.floor(Date.now() / 1000) | 0;
    };

    var arrayfy = function(val){
      return Array.isArray(val) ? val : [val];
    };

    return {
      slugify:      slugify,
      isEmpty:      isEmpty,
      getTimestamp: getTimestamp,
      arrayfy:      arrayfy
    };
  });
