'use strict';

describe('Controller: ConnexionctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ConnexionctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnexionctrlCtrl = $controller('ConnexionctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
