/* istanbul ignore file */

const { createContainer } = require('instances-container');

// External
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const pool = require('./database/postgres/pool');

const UserRepository = require('../Domains/users/UserRepository');

// Service
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const PasswordHash = require('../Applications/security/PasswordHash');

// Use case
const AddUserUseCase = require('../Applications/usecase/AddUserUseCase');

const container = createContainer();

// Services and Repositories
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// Use Case
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

module.exports = container;
