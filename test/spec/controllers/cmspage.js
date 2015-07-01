'use strict';

describe('Controller: CmspageCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CmspageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CmspageCtrl = $controller('CmspageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
