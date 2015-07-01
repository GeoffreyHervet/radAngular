'use strict';

describe('Controller: MyaccountaddresseseditCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var MyaccountaddresseseditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountaddresseseditCtrl = $controller('MyaccountaddresseseditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
