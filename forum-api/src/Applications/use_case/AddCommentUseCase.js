const StoreComment = require('../../Domains/comments/entities/StoreComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository, idGenerator }) {
    this.commentRepository = commentRepository;
    this.threadRepository = threadRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    this.verifyPayload(useCasePayload);

    const { content, threadId, userId } = useCasePayload;
    await this.threadRepository.verifyThreadExist(threadId);

    const commentId = `comment-${this.idGenerator(16)}`;
    const storeComment = new StoreComment({
      id: commentId, content, threadId, userId,
    });

    return this.commentRepository.addComment(storeComment);
  }

  verifyPayload(useCasePayload) {
    const { content } = useCasePayload;

    if (!content) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTIES');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddCommentUseCase;
