const AddLikeUseCase = require('../AddLikeUseCase');
const LikeRepository = require('../../../Domains/likes/LikeRepository');
const StoreLike = require('../../../Domains/likes/entities/StoreLike');

describe('AddLikeUseCase', () => {
  describe('should orchestrating add like action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const mockLikeRepository = new LikeRepository();
    mockLikeRepository.verifyLikeExist = jest.fn(() => Promise.reject());
    mockLikeRepository.removeLike = jest.fn(() => Promise.resolve());

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
    });

    await addLikeUseCase.execute(useCasePayload);

    expect(mockLikeRepository.verifyLikeExist)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockLikeRepository.removeLike)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
  });

  describe('should orchestrating remove like action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      userId: 'user-123',
    };

    const mockLikeRepository = new LikeRepository();
    mockLikeRepository.verifyLikeExist = jest.fn(() => Promise.resolve());
    mockLikeRepository.addLike = jest.fn(() => Promise.resolve());
    const mockIdGenerator = () => '123';

    const addLikeUseCase = new AddLikeUseCase({
      likeRepository: mockLikeRepository,
      idGenerator: mockIdGenerator,
    });

    await addLikeUseCase.execute(useCasePayload);

    expect(mockLikeRepository.verifyLikeExist)
      .toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
    expect(mockLikeRepository.addLike)
      .toBeCalledWith(new StoreLike({
        id: 'like-123',
        ...useCasePayload,
      }));
  });
});
