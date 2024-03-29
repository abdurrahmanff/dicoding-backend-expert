const InvariantError = require('../../Commons/exceptions/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  async addUser({ username, password, fullname }) {
    const id = `user-${this.idGenerator()}`;
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this.pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }
}

module.exports = UserRepositoryPostgres;
