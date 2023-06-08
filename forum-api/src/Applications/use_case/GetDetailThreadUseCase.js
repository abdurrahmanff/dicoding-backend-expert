class GetDetailThreadUseCase {
  constructor({ threadRepository }) {
    this.threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    this.verifyUseCasePayload(useCasePayload);

    const { threadId } = useCasePayload;

    await this.threadRepository.verifyThreadExist(threadId);
    const detailThread = this.threadRepository.getDetailThreadById(threadId);

    return detailThread;
  }

  verifyUseCasePayload(useCasePayload) {
    const { threadId } = useCasePayload;

    if (!threadId) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTIES');
    }

    if (typeof threadId !== 'string') {
      throw new Error('DETAIL_THREAD.DID_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = GetDetailThreadUseCase;
