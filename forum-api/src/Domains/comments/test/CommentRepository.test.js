const CommentRepository = require('../CommentRepository');

describe('CommentRepository test', () => {
  it('should throw error when methods not implemented', async () => {
    const commentRepository = new CommentRepository();

    await expect(() => commentRepository.addComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => commentRepository.verifyUserComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => commentRepository.verifyCommentExist({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => commentRepository.deleteComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => commentRepository.replyComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(() => commentRepository.getCommentsByThreadId({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
