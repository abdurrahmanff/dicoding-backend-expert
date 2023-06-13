const AddLikeUseCase = require('../AddLikeUseCase');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const StoreLike = require('../../../Domains/likes/entities/StoreLike');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddLikeUseCase', () => {
  it('should orchestrating remove like action correctly', async () => {
    const useCasePayload = {
      threadId: 'thread-123',
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const mockLikeRepository = new LikeRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockLikeRepository.verifyLikeNotExist = jest.fn(
      () => Promise.reject(new Error('LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER')),
    );
    mockLikeRepository.removeLike = jest.fn(() => Promise.resolve());
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    await addLikeUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadExist)
      .toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockLikeRepository.verifyLikeNotExist)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockLikeRepository.removeLike)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
  });

  it('should orchestrating add like action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const mockLikeRepository = new LikeRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockIdGenerator = () => '123';

    mockLikeRepository.verifyLikeNotExist = jest.fn(() => Promise.resolve());
    mockLikeRepository.addLike = jest.fn(() => Promise.resolve());
    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      idGenerator: mockIdGenerator,
    });

    await addLikeUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadExist)
      .toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentExist)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockLikeRepository.verifyLikeNotExist)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockLikeRepository.addLike)
      .toBeCalledWith(new StoreLike({
        id: 'like-123',
        ...useCasePayload,
      }));
  });
});
