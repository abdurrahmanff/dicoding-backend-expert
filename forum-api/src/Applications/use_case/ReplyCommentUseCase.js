const StoreComment = require('../../Domains/comments/entities/StoreComment');

class ReplyCommentUseCase {
  constructor({ threadRepository, commentRepository, idGenerator }) {
    this.threadRepository = threadRepository;
    this.commentRepository = commentRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    this.verifyPayload(useCasePayload);

    const {
      threadId, parentId, userId, content,
    } = useCasePayload;

    await this.threadRepository.verifyThreadExist(threadId);
    await this.commentRepository.verifyCommentExist(parentId);

    const replyId = `reply-${this.idGenerator(16)}`;

    const storeReply = new StoreComment({
      id: replyId,
      content,
      threadId,
      userId,
    });

    return this.commentRepository.replyComment(parentId, storeReply);
  }

  verifyPayload(useCasePayload) {
    const { content } = useCasePayload;

    if (!content) {
      throw new Error('REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTIES');
    }

    if (typeof content !== 'string') {
      throw new Error('REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ReplyCommentUseCase;
