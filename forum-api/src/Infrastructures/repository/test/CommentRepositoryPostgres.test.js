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
});
