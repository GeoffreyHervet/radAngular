'use strict';

describe('Controller: MyaccountprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var MyaccountprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountprofileCtrl = $controller('MyaccountprofileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
