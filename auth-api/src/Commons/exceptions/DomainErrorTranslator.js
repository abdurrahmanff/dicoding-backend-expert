const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return this.directories[error.message] || error;
  },

  directories: {
    'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
    'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATIONS': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
    'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
    'REGISTER_USER.USERNAME_CONTAINS_RESTRICTED_CHAR': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  },
};

module.exports = DomainErrorTranslator;
