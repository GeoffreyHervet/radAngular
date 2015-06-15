'use strict';

describe('Service: responseHandler', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var responseHandler;
  beforeEach(inject(function (_responseHandler_) {
    responseHandler = _responseHandler_;
  }));

  it('should do something', function () {
    expect(!!responseHandler).toBe(true);
  });

});
