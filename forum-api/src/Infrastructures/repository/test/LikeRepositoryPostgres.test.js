const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const pool = require('../../database/postgres/pool');
const StoreLike = require('../../../Domains/likes/entities/StoreLike');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

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

  describe('verifyLikeNotExist method', () => {
    it('should throw error when comment have been liked', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      await LikesTableTestHelper.addLike({ commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool);

      await expect(likeRepositoryPostgres.verifyLikeNotExist(commentId, userId))
        .rejects
        .toThrowError('LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER');
    });

    it("should not throw error when comment haven't been liked", async () => {
      const commentId = 'comment-223';
      const userId = 'user-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-223', threadId: 'thread-123', userId: 'user-123' });
      await LikesTableTestHelper.addLike({ commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool);

      await expect(likeRepositoryPostgres.verifyLikeNotExist(commentId, userId))
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

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool);

      await likeRepositoryPostgres.addLike(storeLike);

      const like = await LikesTableTestHelper.findLikeById(storeLike.id);
      expect(like).toHaveLength(1);
    });
  });

  describe('removeLike method', () => {
    it('should remove like from db properly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      await LikesTableTestHelper.addLike({ id: 'like-123', commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool);

      await likeRepositoryPostgres.removeLike(commentId, userId);

      const like = await LikesTableTestHelper.findLikeById('like-123');
      expect(like).toHaveLength(0);
    });
  });

  describe('geLikeFromComment method', () => {
    it('should get like count correctly', async () => {
      const commentId = 'comment-123';

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123', threadId: 'thread-123', userId: 'user-123' });
      await LikesTableTestHelper.addLike({ id: 'like-123', commentId: 'comment-123', userId: 'user-123' });

      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool);

      const likeCount = await likeRepositoryPostgres.getLikeFromComment(commentId);

      expect(likeCount).toEqual(1);
    });
  });
});
