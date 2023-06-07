const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const StoreComment = require('../../../Domains/comments/entities/StoreComment');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('ComnmentRepository Postgress implementation', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should add comment to db', async () => {
      const storeComment = new StoreComment({
        id: 'comment-123',
        content: 'this is comment',
        threadId: 'thread-123',
        userId: 'user-123',
      });

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      await commentRepositoryPostgres.addComment(storeComment);

      const comment = await CommentsTableTestHelper.findCommentById('comment-123');

      expect(comment).toHaveLength(1);
    });
  });

  describe('verifyCommentExist function', () => {
    it('should throw error when comment not exist', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      await expect(() => commentRepositoryPostgres.verifyCommentExist('comment-133'))
        .rejects
        .toThrowError('komentar tidak ditemukan');
    });
  });

  describe('verifyUserComment function', () => {
    it('should throw error when user dont have access to comment', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      await expect(() => commentRepositoryPostgres.verifyUserComment('comment-123', 'user-133'))
        .rejects
        .toThrowError('tidak berhak mengakses komentar');
    });
  });

  describe('deleteComment function', () => {
    it('should throw error when comment not exist', async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      await commentRepositoryPostgres.deleteComment('comment-123');

      const comment = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comment[0].deleted).toBeTruthy();
    });
  });

  describe('replyComment function', () => {
    it('should store replied comment to db properly', async () => {
      const parentId = 'comment-123';

      const storeComment = new StoreComment({
        id: 'reply-123',
        content: 'this is comment',
        threadId: 'thread-123',
        userId: 'user-123',
      });

      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'user A' });
      await UsersTableTestHelper.addUser({ id: 'user-124', username: 'user B' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
      await CommentsTableTestHelper.addComment({ id: 'comment-123' });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      await commentRepositoryPostgres.replyComment(parentId, storeComment);

      const replyComment = await CommentsTableTestHelper.findCommentById(storeComment.id);

      expect(replyComment).toHaveLength(1);
    });
  });
});
