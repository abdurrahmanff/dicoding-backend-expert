const StoreLike = require('../../Domains/likes/entities/StoreLike');

class AddLikeUseCase {
  constructor({
    threadRepository, commentRepository, likeRepository, idGenerator,
  }) {
    this.threadRepository = threadRepository;
    this.commentRepository = commentRepository;
    this.likeRepository = likeRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    const { threadId, commentId, userId } = useCasePayload;

    await this.threadRepository.verifyThreadExist(threadId);
    await this.commentRepository.verifyCommentExist(commentId);
    try {
      await this.likeRepository.verifyLikeNotExist(commentId, userId);

      const storeLike = new StoreLike({
        id: `like-${this.idGenerator(16)}`,
        commentId,
        userId,
      });

      await this.likeRepository.addLike(storeLike);
    } catch (e) {
      if (e.message === 'LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER') {
        await this.likeRepository.removeLike(commentId, userId);
      }
    }
  }
}

module.exports = AddLikeUseCase;
