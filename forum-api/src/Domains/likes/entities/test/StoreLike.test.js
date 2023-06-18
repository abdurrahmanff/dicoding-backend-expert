const StoreLike = require('../StoreLike');

describe('StoreLike', () => {
  it('should create StoreLike object correctly', () => {
    const payload = {
      id: 'like-123',
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const storeLike = new StoreLike(payload);

    expect(storeLike).toStrictEqual(new StoreLike({
      ...payload,
    }));
  });
});
