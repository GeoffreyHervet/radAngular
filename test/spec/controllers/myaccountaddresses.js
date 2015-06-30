'use strict';

describe('Controller: MyaccountaddressesCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var MyaccountaddressesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountaddressesCtrl = $controller('MyaccountaddressesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
