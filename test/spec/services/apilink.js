'use strict';

describe('Service: ApiLink', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var ApiLink;
  beforeEach(inject(function (_ApiLink_) {
    ApiLink = _ApiLink_;
  }));

  it('should do something', function () {
    expect(!!ApiLink).toBe(true);
  });

});
