'use strict';

describe('Controller: CartbillingaddresslistCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CartbillingaddresslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartbillingaddresslistCtrl = $controller('CartbillingaddresslistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
