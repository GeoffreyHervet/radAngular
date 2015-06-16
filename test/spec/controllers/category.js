'use strict';

describe('Controller: CategoryctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CategoryctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoryctrlCtrl = $controller('CategoryctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
