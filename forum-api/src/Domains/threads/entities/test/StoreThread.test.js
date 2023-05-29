const StoreThread = require('../StoreThread');

describe('first', () => {
  it('should create Thread object correctly', () => {
    const payload = {
      title: 'Thread Title',
      body: 'this is thread body xddwalk',
      owner: 'user-123',
    };

    const storeThread = new StoreThread(payload);

    expect(storeThread.title).toEqual(payload.title);
    expect(storeThread.body).toEqual(payload.body);
    expect(storeThread.owner).toEqual(payload.owner);
  });
});
