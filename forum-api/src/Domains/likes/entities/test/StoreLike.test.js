const StoreLike = require('../StoreLike');

describe('StoreLike', () => {
  it('should create StoreLike object correctly', () => {
    const payload = {
      id: 'like-123',
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const storeLike = new StoreLike(payload);

    expect(storeLike.id).toEqual(payload.id);
    expect(storeLike.commentId).toEqual(payload.commentId);
    expect(storeLike.userId).toEqual(payload.userId);
  });
});
