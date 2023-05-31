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
}

module.exports = ThreadRepositoryPostgres;
