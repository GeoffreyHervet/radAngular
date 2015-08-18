'use strict';

describe('Directive: magentoAddress', function () {

  // load the directive's module
  beforeEach(module('angularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<magento-address></magento-address>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the magentoAddress directive');
  }));
});
