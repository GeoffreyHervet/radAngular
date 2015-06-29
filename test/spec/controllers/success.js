'use strict';

describe('Controller: SuccessctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var SuccessctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuccessctrlCtrl = $controller('SuccessctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
