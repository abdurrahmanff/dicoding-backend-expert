const CommentRepository = require('../CommentRepository');

describe('CommentRepository test', () => {
  it('should throw error when methods not implemented', async () => {
    const commentRepository = new CommentRepository();

    await expect(() => commentRepository.addComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});