'use strict';

describe('Controller: MyaccountprofileemailCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var MyaccountprofileemailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyaccountprofileemailCtrl = $controller('MyaccountprofileemailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
