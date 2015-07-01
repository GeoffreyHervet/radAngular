'use strict';

describe('Service: Cms', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var Cms;
  beforeEach(inject(function (_Cms_) {
    Cms = _Cms_;
  }));

  it('should do something', function () {
    expect(!!Cms).toBe(true);
  });

});
