'use strict';

describe('Service: HomeInserts', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var HomeInserts;
  beforeEach(inject(function (_HomeInserts_) {
    HomeInserts = _HomeInserts_;
  }));

  it('should do something', function () {
    expect(!!HomeInserts).toBe(true);
  });

});
