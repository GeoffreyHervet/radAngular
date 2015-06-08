'use strict';

describe('Controller: LostpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var LostpasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LostpasswordCtrl = $controller('LostpasswordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
