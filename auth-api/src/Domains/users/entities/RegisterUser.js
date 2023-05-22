class RegisterUser {
  constructor({ username, password, fullname }) {
    if (!username || !password || !fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[a-zA-Z1-9_]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAINS_RESTRICTED_CHAR');
    }

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }
}

module.exports = RegisterUser;