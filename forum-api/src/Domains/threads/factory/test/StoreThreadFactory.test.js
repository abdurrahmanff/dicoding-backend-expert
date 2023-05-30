const StoreThread = require('../../entities/StoreThread');
const StoreThreadFactory = require('../StoreThreadFactory');

describe('StoreThreadFactory test', () => {
  it('should create StoreThread object correctly', () => {
    const payload = {
      title: 'Thread Title',
      body: 'this is thread body xddwalk',
      owner: 'user-123',
    };

    const storeThread = new StoreThreadFactory(payload).build();

    expect(storeThread).toBeInstanceOf(StoreThread);
    expect(typeof storeThread.id).toEqual('string');
    expect(storeThread.title).toEqual(payload.title);
    expect(storeThread.body).toEqual(payload.body);
    expect(storeThread.owner).toEqual(payload.owner);
  });
});
