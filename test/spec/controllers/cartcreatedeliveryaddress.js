'use strict';

describe('Controller: CartcreatedeliveryaddressCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CartcreatedeliveryaddressCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartcreatedeliveryaddressCtrl = $controller('CartcreatedeliveryaddressCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
