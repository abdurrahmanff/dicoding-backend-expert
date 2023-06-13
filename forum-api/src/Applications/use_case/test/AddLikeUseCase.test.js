const AddLikeUseCase = require('../AddLikeUseCase');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const StoreLike = require('../../../Domains/likes/entities/StoreLike');

describe('AddLikeUseCase', () => {
  it('should orchestrating remove like action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const mockLikeRepository = new LikeRepository();
    mockLikeRepository.verifyLikeNotExist = jest.fn(
      () => Promise.reject(new Error('LIKE_REPOSITORY.COMMENT_HAVE_BEEN_LIKED_BY_USER')),
    );
    mockLikeRepository.removeLike = jest.fn(() => Promise.resolve());

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
    });

    await addLikeUseCase.execute(useCasePayload);

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
    mockLikeRepository.verifyLikeNotExist = jest.fn(() => Promise.resolve());
    mockLikeRepository.addLike = jest.fn(() => Promise.resolve());
    const mockIdGenerator = () => '123';

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
      idGenerator: mockIdGenerator,
    });

    await addLikeUseCase.execute(useCasePayload);

    expect(mockLikeRepository.verifyLikeNotExist)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockLikeRepository.addLike)
      .toBeCalledWith(new StoreLike({
        id: 'like-123',
        ...useCasePayload,
      }));
  });
});
