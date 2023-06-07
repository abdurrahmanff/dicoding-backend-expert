const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addComment(storeComment) {
    const {
      id, content, threadId, userId,
    } = storeComment;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, user_id as owner',
      values: [id, content, threadId, userId, date],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async verifyCommentExist(id) {
    const query = {
      text: 'SELECT id FROM comments WHERE id=$1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('komentar tidak ditemukan');
    }
  }

  async verifyUserComment(commentId, userId) {
    const query = {
      text: 'SELECT id FROM comments WHERE id=$1 AND user_id=$2',
      values: [commentId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('tidak berhak mengakses komentar');
    }
  }

  async deleteComment(id) {
    const query = {
      text: 'UPDATE comments SET deleted=TRUE WHERE id=$1',
      values: [id],
    };

    await this.pool.query(query);
  }

  async replyComment(parentId, storeComment) {
    const {
      id, content, threadId, userId,
    } = storeComment;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES ($1, $2, $3, $4, $5, FALSE, $6) RETURNING id, content, user_id AS owner',
      values: [id, content, threadId, userId, date, parentId],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

module.exports = CommentRepositoryPostgres;
