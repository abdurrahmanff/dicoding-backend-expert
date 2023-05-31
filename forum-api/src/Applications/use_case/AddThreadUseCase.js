const StoreThread = require('../../Domains/threads/entities/StoreThread');

class AddThreadUseCase {
  constructor({ threadRepository, idGenerator }) {
    this.threadRepository = threadRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    this.verifyPayload(useCasePayload);
    const threadId = `thread-${this.idGenerator(16)}`;
    const storeThread = new StoreThread({ id: threadId, ...useCasePayload });
    return this.threadRepository.addThread(storeThread);
  }

  verifyPayload(useCasePayload) {
    const { title, body, owner } = useCasePayload;

    if (!title || !body || !owner) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string' || typeof owner !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThreadUseCase;
