const StoreLike = require('../../Domains/likes/entities/StoreLike');

class AddLikeUseCase {
  constructor({ likeRepository, idGenerator }) {
    this.likeRepository = likeRepository;
    this.idGenerator = idGenerator;
  }

  async execute(useCasePayload) {
    const { commentId, userId } = useCasePayload;
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
