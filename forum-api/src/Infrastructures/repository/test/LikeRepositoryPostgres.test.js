const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const pool = require('../../database/postgres/pool');
const StoreLike = require('../../../Domains/likes/entities/StoreLike');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('LikeRepository postgres implementation', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await LikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('verifyLikeExist method', () => {
    it('should throw error when comment have been liked', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      UsersTableTestHelper.addUser({ id: 'user-123' });
      ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      LikesTableTestHelper.addLike({ commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres();

      await expect(() => likeRepositoryPostgres.verifyLikeNotExist(commentId, userId))
        .rejects
        .toThrowError('LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER');
    });

    it("should not throw error when comment haven't been liked", async () => {
      const commentId = 'comment-223';
      const userId = 'user-123';

      UsersTableTestHelper.addUser({ id: 'user-123' });
      ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      CommentsTableTestHelper.addComment({ id: 'comment-223', threadId: 'thread-123', userId: 'user-123' });
      LikesTableTestHelper.addLike({ commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres();

      await expect(() => likeRepositoryPostgres.verifyLikeNotExist(commentId, userId))
        .resolves.not
        .toThrowError();
    });
  });

  describe('addLike method', () => {
    it('should save like to db properly', async () => {
      const storeLike = new StoreLike({
        id: 'like-123',
        commentId: 'comment-123',
        userId: 'user-123',
      });

      UsersTableTestHelper.addUser({ id: 'user-123' });
      ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres();

      await likeRepositoryPostgres.addLike(storeLike);

      const like = LikesTableTestHelper.findLikeById(storeLike.id);
      expect(like).toHaveLength(1);
    });
  });

  describe('removeLike method', () => {
    it('should remove like from db properly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      UsersTableTestHelper.addUser({ id: 'user-123' });
      ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      LikesTableTestHelper.addLike({ id: 'like-123', commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres();

      await likeRepositoryPostgres.removeLike(commentId, userId);

      const like = LikesTableTestHelper.findLikeById('like-123');
      expect(like).toHaveLength(0);
    });
  });
});
