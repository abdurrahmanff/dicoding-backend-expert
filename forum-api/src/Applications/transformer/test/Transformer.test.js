const ThreadTransformer = require('../Transformer');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('CommentTransformer', () => {
  describe('buildCommentTree', () => {
    it('should build the comment tree', () => {
      // Arrange
      const comments = [
        new DetailComment({
          id: 'comment-123',
          username: 'dicoding',
          date: '2023-06-07T14:16:49.780Z',
          content: 'sebuah comment',
          deleted: false,
          parent: null,
          likeCount: 0,
        }),
        new DetailComment({
          id: 'comment-124',
          username: 'dicoding',
          date: '2023-06-07T15:20:49.780Z',
          content: 'sebuah comment',
          deleted: false,
          parent: null,
          likeCount: 0,
        }),
        new DetailComment({
          id: 'reply-123',
          username: 'dicoding',
          date: '2023-06-07T15:16:49.780Z',
          content: 'sebuah reply',
          deleted: true,
          parent: 'comment-123',
          likeCount: 0,
        }),
        new DetailComment({
          id: 'reply-124',
          username: 'dicoding',
          date: '2023-06-08T15:16:49.780Z',
          content: 'sebuah reply',
          deleted: false,
          parent: 'comment-123',
          likeCount: 0,
        }),
      ];

      const expectedComment = [{
        id: 'comment-123',
        username: 'dicoding',
        date: '2023-06-07T14:16:49.780Z',
        content: 'sebuah comment',
        likeCount: 0,
        replies: [
          {
            id: 'reply-123',
            username: 'dicoding',
            date: '2023-06-07T15:16:49.780Z',
            content: '**balasan telah dihapus**',
            likeCount: 0,
            replies: [],
          },
          {
            id: 'reply-124',
            username: 'dicoding',
            date: '2023-06-08T15:16:49.780Z',
            content: 'sebuah reply',
            likeCount: 0,
            replies: [],
          },
        ],
      },
      {
        id: 'comment-124',
        username: 'dicoding',
        date: '2023-06-07T15:20:49.780Z',
        content: 'sebuah comment',
        likeCount: 0,
        replies: [],
      }];

      // Act
      const transformedComment = ThreadTransformer.buildCommentTree(comments, null);

      // Assert
      expect(transformedComment).toEqual(expectedComment);
    });
  });
});
