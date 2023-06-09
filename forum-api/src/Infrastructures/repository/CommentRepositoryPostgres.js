const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../Domains/comments/entities/DetailComment');

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

  async getCommentsByThreadId(id) {
    const query = {
      text: `SELECT c.id, c.content, c.date, c.deleted, c.parent, u.username
      FROM comments as C
      JOIN users AS u ON c.user_id = u.id
      WHERE c.thread_id = $1
      GROUP BY c.date, c.id, u.username
      ORDER BY c.date ASC`,
      values: [id],
    };

    const result = await this.pool.query(query);

    const comments = result.rows.map((row) => new DetailComment({
      id: row.id,
      username: row.username,
      content: row.content,
      deleted: row.deleted,
      date: row.date,
      parent: row.parent,
    }));

    return comments;
  }
}

module.exports = CommentRepositoryPostgres;
