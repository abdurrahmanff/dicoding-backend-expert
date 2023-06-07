const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const StoreComment = require('../../../Domains/comments/entities/StoreComment');

describe('AddCommentUseCase test', () => {
  it('should throw error when payload did not contain needed properties', async () => {
    const useCasePayload = {
      threadId: 'thread-123',
      userId: 'user-123',
    };

    const addCommentUseCase = new AddCommentUseCase({});
    await expect(addCommentUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTIES');
  });

  it('should throw error when payload did not meet data type specifications', async () => {
    const useCasePayload = {
      content: [],
      threadId: 'thread-123',
      userId: 'user-123',
    };

    const addCommentUseCase = new AddCommentUseCase({});
    await expect(addCommentUseCase.execute(useCasePayload)).rejects.toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating add comment action correctly', async () => {
    const useCasePayload = {
      content: 'this is comment',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    const mockStoredComment = {
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.userId,
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockIdGenerator = () => '123';

    mockThreadRepository.verifyThreadExist = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockStoredComment));

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      idGenerator: mockIdGenerator,
    });

    const storedComment = await addCommentUseCase.execute(useCasePayload);

    expect(storedComment).toStrictEqual({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: useCasePayload.userId,
    });
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(new StoreComment({
      id: 'comment-123',
      content: useCasePayload.content,
      threadId: useCasePayload.threadId,
      userId: useCasePayload.userId,
    }));
  });
});
