const StoreThread = require('../StoreThread');

describe('first', () => {
  it('should throw error when title length is more than 50', () => {
    const payload = {
      id: 'thread-123',
      title: 'Super Long Title Thread Bruh Who Make Title This long OOOMAAAGAAAAOOOMAAAGAAAAOOOMAAAGAAAAOOOMAAAGAAAAOOOMAAAGAAAAOOOMAAAGAAAA',
      body: 'this is thread body',
      owner: 'user-123',
    };

    expect(() => new StoreThread(payload)).toThrowError('STORE_THREAD.TITLE_LIMIT_CHAR');
  });
  it('should create Thread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'Thread Title',
      body: 'this is thread body xddwalk',
      owner: 'user-123',
    };

    const storeThread = new StoreThread(payload);

    expect(storeThread).toStrictEqual(new StoreThread({
      ...payload,
    }));
  });
});
