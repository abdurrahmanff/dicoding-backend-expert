const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const DetailThread = require('../../Domains/threads/entities/DetailThread');
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

    return new StoreThread(result.rows[0]);
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
    const query = {
      text: `SELECT t.id, t.title, t.body, t.date, u.username
      FROM threads AS t
      JOIN users AS u ON t.user_id = u.id
      WHERE t.id = $1
      GROUP BY t.date, t.id, u.username
      ORDER BY t.date ASC`,
      values: [id],
    };

    const result = await this.pool.query(query);

    const detailThread = new DetailThread({
      id: result.rows[0].id,
      title: result.rows[0].title,
      body: result.rows[0].body,
      date: result.rows[0].date,
      username: result.rows[0].username,
      comments: [],
    });

    return detailThread;
  }
}

module.exports = ThreadRepositoryPostgres;
