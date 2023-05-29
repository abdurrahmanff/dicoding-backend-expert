const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'Thread Title',
    body = 'this is thread body',
    date = new Date().toISOString(),
    userId = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, date, userId],
    };

    await this.pool.query(query);
  },
  async findThreadById(id) {
    const query = {
      text: 'SELECT FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;