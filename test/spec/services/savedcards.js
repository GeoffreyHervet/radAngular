'use strict';

describe('Service: SavedCards', function () {

  // load the service's module
  beforeEach(module('angularApp'));

  // instantiate service
  var SavedCards;
  beforeEach(inject(function (_SavedCards_) {
    SavedCards = _SavedCards_;
  }));

  it('should do something', function () {
    expect(!!SavedCards).toBe(true);
  });

});
