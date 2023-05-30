const RegisterUser = require('../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHash, idGenerator }) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    const registerUserId = `user-${this.idGenerator(16)}`;
    const registerUser = new RegisterUser({ id: registerUserId, ...useCasePayload });
    await this.userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this.passwordHash.hash(registerUser.password);
    return this.userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
