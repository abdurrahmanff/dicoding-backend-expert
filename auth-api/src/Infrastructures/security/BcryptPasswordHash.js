const PasswordHash = require('../../Applications/security/PasswordHash');

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, salt = 10) {
    super();
    this.bcrypt = bcrypt;
    this.salt = salt;
  }

  async hash(password) {
    return this.bcrypt.hash(password, this.salt);
  }
}

module.exports = BcryptPasswordHash;
