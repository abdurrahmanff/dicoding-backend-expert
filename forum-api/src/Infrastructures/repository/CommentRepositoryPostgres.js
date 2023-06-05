const CommentRepository = require('../../Domains/comments/CommentRepository');

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
}

module.exports = CommentRepositoryPostgres;
