'use strict';

describe('Controller: MyordersCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var MyordersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyordersCtrl = $controller('MyordersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
