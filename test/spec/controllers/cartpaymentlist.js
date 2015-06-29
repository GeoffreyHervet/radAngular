'use strict';

describe('Controller: CartpaymentlistCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CartpaymentlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartpaymentlistCtrl = $controller('CartpaymentlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
