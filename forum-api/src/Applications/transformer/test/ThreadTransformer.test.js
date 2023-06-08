const ThreadTransformer = require('../ThreadTransformer');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('ThreadTransformer', () => {
  describe('transform', () => {
    it('should transform raw thread data into DetailThread object', () => {
      // Arrange
      const rawThreadData = [
        {
          id: 'thread-sfyLjBUiODFzzwoe',
          title: 'sebuah thread',
          body: 'sebuah body thread',
          date: '2023-06-07T14:16:49.701Z',
          t_user: 'dicoding',
          c_id: 'comment-jGp5UWrW6GeceJFj',
          c_user: 'dicoding',
          c_date: '2023-06-07T14:16:49.780Z',
          content: 'sebuah comment',
          deleted: false,
          c_parent: null,
        },
      ];

      const expectedThread = new DetailThread({
        id: 'thread-sfyLjBUiODFzzwoe',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        date: '2023-06-07T14:16:49.701Z',
        username: 'dicoding',
        comments: [
          new DetailComment({
            id: 'comment-jGp5UWrW6GeceJFj',
            username: 'dicoding',
            date: '2023-06-07T14:16:49.780Z',
            content: 'sebuah comment',
            replies: [],
          }),
        ],
      });

      // Act
      const transformedThread = ThreadTransformer.transform(rawThreadData);

      // Assert
      expect(transformedThread).toEqual(expectedThread);
    });
  });

  describe('buildCommentTree', () => {
    it('should build the comment tree', () => {
      // Arrange
      const rawThreadData = [
        {
          id: 'thread-sfyLjBUiODFzzwoe',
          title: 'sebuah thread',
          body: 'sebuah body thread',
          date: '2023-06-07T14:16:49.701Z',
          t_user: 'dicoding',
          c_id: 'comment-jGp5UWrW6GeceJFj',
          c_user: 'dicoding',
          c_date: '2023-06-07T14:16:49.780Z',
          content: 'sebuah comment',
          deleted: true,
          c_parent: null,
        },
        {
          id: 'thread-sfyLjBUiODFzzwoe',
          title: 'sebuah thread',
          body: 'sebuah body thread',
          date: '2023-06-07T14:16:49.701Z',
          t_user: 'dicoding',
          c_id: 'reply-Fjskaoi(fjgkSfwq',
          c_user: 'dicoding',
          c_date: '2023-06-07T15:16:49.780Z',
          content: 'sebuah comment',
          deleted: true,
          c_parent: 'comment-jGp5UWrW6GeceJFj',
        },
      ];

      const expectedComment = new DetailComment({
        id: 'comment-jGp5UWrW6GeceJFj',
        username: 'dicoding',
        date: '2023-06-07T14:16:49.780Z',
        content: '**komentar telah dihapus**',
        replies: [
          new DetailComment({
            id: 'reply-Fjskaoi(fjgkSfwq',
            username: 'dicoding',
            date: '2023-06-07T15:16:49.780Z',
            content: '**balasan telah dihapus**',
            replies: [],
          }),
        ],
      });

      // Act
      const transformedComment = ThreadTransformer.buildCommentTree(rawThreadData, null);

      // Assert
      expect(transformedComment).toEqual([expectedComment]);
    });
  });
});
