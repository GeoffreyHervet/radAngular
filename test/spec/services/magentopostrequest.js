'use strict';

describe('Service: MagentoPostRequest', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var magentoPostRequest;
  beforeEach(inject(function (_magentoPostRequest_) {
    magentoPostRequest = _magentoPostRequest_;
  }));

  it('should do something', function () {
    expect(!!magentoPostRequest).toBe(true);
  });

});
