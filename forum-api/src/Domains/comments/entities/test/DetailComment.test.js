const DetailComment = require('../DetailComment');

describe('DetailComment test', () => {
  it('should create DetailComment object properly', () => {
    const payload = {
      id: 'comment-123',
      username: 'username',
      date: 'now',
      content: 'isi komentar',
      deleted: true,
      parent: null,
    };

    const detailComment = new DetailComment(payload);

    expect(detailComment).toStrictEqual(new DetailComment({
      ...payload,
      likeCount: 0,
    }));
  });

  describe('getContent function', () => {
    it('should return its value if comment/reply is not deleted', () => {
      const payload = {
        id: 'comment-123',
        username: 'username',
        date: 'now',
        content: 'isi komentar',
        deleted: false,
        parent: null,
      };

      const detailComment = new DetailComment(payload);

      expect(detailComment.getContent()).toEqual(payload.content);
    });

    it('should return "**komentar telah dihapus**" if comment is deleted', () => {
      const payload = {
        id: 'comment-123',
        username: 'username',
        date: 'now',
        content: 'isi komentar',
        deleted: true,
        parent: null,
      };

      const detailComment = new DetailComment(payload);

      expect(detailComment.getContent()).toEqual('**komentar telah dihapus**');
    });

    it('should return "**balasan telah dihapus**" if reply is not deleted', () => {
      const payload = {
        id: 'reply-123',
        username: 'username',
        date: 'now',
        content: 'isi komentar',
        deleted: true,
        parent: 'comment-123',
      };

      const detailComment = new DetailComment(payload);

      expect(detailComment.getContent()).toEqual('**balasan telah dihapus**');
    });
  });

  describe('setLikeCount method', () => {
    it('should set likeCount property properly', () => {
      const likeCount = 5;

      const detailComment = new DetailComment({
        id: 'comment-123',
        username: 'username',
        date: 'now',
        content: 'isi komentar',
        deleted: true,
        parent: null,
      });

      detailComment.setLikeCount(likeCount);

      expect(detailComment.likeCount).toEqual(likeCount);
    });
  });
});
