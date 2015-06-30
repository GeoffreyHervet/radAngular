'use strict';

describe('Controller: PagehelpCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var PagehelpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PagehelpCtrl = $controller('PagehelpCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
