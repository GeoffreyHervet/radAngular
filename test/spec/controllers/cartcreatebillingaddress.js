'use strict';

describe('Controller: CartcreatebillingaddressctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CartcreatebillingaddressctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartcreatebillingaddressctrlCtrl = $controller('CartcreatebillingaddressctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
