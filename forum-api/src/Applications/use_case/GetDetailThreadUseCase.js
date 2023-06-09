const ThreadTransformer = require('../transformer/Transformer');

class GetDetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this.threadRepository = threadRepository;
    this.commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    this.verifyUseCasePayload(useCasePayload);

    const { threadId } = useCasePayload;

    await this.threadRepository.verifyThreadExist(threadId);
    const thread = await this.threadRepository.getDetailThreadById(threadId);
    const comments = await this.commentRepository.getCommentsByThreadId(threadId);

    thread.comments = ThreadTransformer.buildCommentTree(comments, null);

    return thread;
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
