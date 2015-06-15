'use strict';

describe('Directive: grayPage', function () {

  // load the directive's module
  beforeEach(module('angularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gray-page></gray-page>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the grayPage directive');
  }));
});
