'use strict';

describe('Controller: OrderrecapCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var OrderrecapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderrecapCtrl = $controller('OrderrecapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
