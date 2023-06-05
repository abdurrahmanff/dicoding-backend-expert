class DeleteCommentUseCase {
  constructor({ commentRepository }) {
    this.commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { commentId, userId } = useCasePayload;

    await this.commentRepository.verifyCommentExist(commentId);
    await this.commentRepository.verifyUserComment(commentId, userId);
    await this.commentRepository.deleteComment(commentId);
  }
}

module.exports = DeleteCommentUseCase;
