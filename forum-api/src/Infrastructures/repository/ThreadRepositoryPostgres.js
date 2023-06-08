const ThreadTransformer = require('../../Applications/transformer/ThreadTransformer');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const StoreThread = require('../../Domains/threads/entities/StoreThread');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async addThread(storeThread) {
    const {
      id, title, body, owner,
    } = storeThread;

    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, body, user_id AS owner',
      values: [id, title, body, date, owner],
    };

    const result = await this.pool.query(query);

    return new StoreThread({ ...result.rows[0] });
  }

  async verifyThreadExist(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id=$1',
      values: [threadId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }

  async getDetailThreadById(id) {
    await this.verifyThreadExist(id);

    const query = {
      text: `SELECT t.id, t.title, t.body, t.date, ut.username AS t_user, c.id AS c_id, uc.username AS c_user, c.date AS c_date, c.content, c.deleted, c.parent AS c_parent
      FROM threads AS t
      JOIN users AS ut ON t.user_id = ut.id
      LEFT JOIN comments AS c ON t.id = c.thread_id
      JOIN users AS uc ON c.user_id = uc.id 
      WHERE t.id = $1
      GROUP BY c_date, t.id, t_user, c_id, c_user
      ORDER BY c_date ASC`,
      values: [id],
    };

    const result = await this.pool.query(query);

    const detailThread = ThreadTransformer.transform(result.rows);

    return detailThread;
  }
}

module.exports = ThreadRepositoryPostgres;
