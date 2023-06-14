const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async verifyLikeNotExist(commentId, userId) {
    const query = {
      text: 'SELECT id FROM likes WHERE comment_id=$1 AND user_id=$2',
      values: [commentId, userId],
    };

    const result = await this.pool.query(query);

    if (result.rowCount) {
      throw new Error('LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER');
    }
  }

  async addLike(storeLike) {
    const { id, commentId, userId } = storeLike;

    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3)',
      values: [id, commentId, userId],
    };

    await this.pool.query(query);
  }

  async removeLike(commentId, userId) {
    const query = {
      text: 'DELETE FROM likes WHERE comment_id=$1 AND user_id=$2',
      values: [commentId, userId],
    };

    await this.pool.query(query);
  }

  async getLikeFromComment(commentId) {
    const query = {
      text: 'SELECT COUNT(id) FROM likes WHERE comment_id=$1',
      values: [commentId],
    };

    const result = await this.pool.query(query);
    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = LikeRepositoryPostgres;
