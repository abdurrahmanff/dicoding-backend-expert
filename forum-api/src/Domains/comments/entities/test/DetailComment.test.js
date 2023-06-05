const DetailComment = require('../DetailComment');

describe('DetailComment test', () => {
  it('should create DetailComment object properly', () => {
    const payload = {
      id: 'comment-123',
      username: 'username',
      date: 'now',
      content: 'isi komentar',
    };

    const detailComment = new DetailComment(payload);

    expect(detailComment.id).toEqual(payload.id);
    expect(detailComment.username).toEqual(payload.username);
    expect(detailComment.date).toEqual(payload.date);
    expect(detailComment.content).toEqual(payload.content);
  });
});
