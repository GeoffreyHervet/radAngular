'use strict';

describe('Service: MenuCategories', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var MenuCategories;
  beforeEach(inject(function (_MenuCategories_) {
    MenuCategories = _MenuCategories_;
  }));

  it('should do something', function () {
    expect(!!MenuCategories).toBe(true);
  });

});
