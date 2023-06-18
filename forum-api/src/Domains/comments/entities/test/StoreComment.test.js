const StoreComment = require('../StoreComment');

describe('StoreComment test', () => {
  it('should create StoreComment object correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'This is comment xddriki',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    const storeComment = new StoreComment(payload);

    expect(storeComment).toStrictEqual(new StoreComment({
      ...payload,
    }));
  });
});
