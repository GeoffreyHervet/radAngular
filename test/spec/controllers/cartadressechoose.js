'use strict';

describe('Controller: CartadressechooseCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CartadressechooseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartadressechooseCtrl = $controller('CartadressechooseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
