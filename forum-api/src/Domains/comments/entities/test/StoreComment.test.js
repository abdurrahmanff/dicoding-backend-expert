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

    expect(storeComment.id).toEqual(payload.id);
    expect(storeComment.content).toEqual(payload.content);
    expect(storeComment.threadId).toEqual(payload.threadId);
    expect(storeComment.userId).toEqual(payload.userId);
  });
});
