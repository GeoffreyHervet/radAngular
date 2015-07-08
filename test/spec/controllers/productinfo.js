'use strict';

describe('Controller: ProductinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ProductinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductinfoCtrl = $controller('ProductinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
