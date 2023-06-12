const CommentRepository = require('../../../Domains/comments/CommentRepository');
const StoreComment = require('../../../Domains/comments/entities/StoreComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ReplyCommentUseCase = require('../ReplyCommentUseCase');

describe('ReplyCommentUseCase test', () => {
  it('should throw error when payload did not contain needed properties', async () => {
    const useCasePayload = {
      threadId: 'thread-123',
      parentId: 'comment-123',
      userId: 'user-123',
    };

    const replyCommentUseCase = new ReplyCommentUseCase({});
    await expect(replyCommentUseCase.execute(useCasePayload)).rejects.toThrowError('REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTIES');
  });

  it('should throw error when payload did not meet data type specifications', async () => {
    const useCasePayload = {
      content: [],
      threadId: 'thread-123',
      parentId: 'comment-123',
      userId: 'user-123',
    };

    const replyCommentUseCase = new ReplyCommentUseCase({});
    await expect(replyCommentUseCase.execute(useCasePayload)).rejects.toThrowError('REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating add comment action correctly', async () => {
    const useCasePayload = {
      content: 'this is comment',
      threadId: 'thread-123',
      parentId: 'comment-123',
      userId: 'user-123',
    };

    const mockStoredComment = {
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCasePayload.userId,
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockIdGenerator = () => '123';

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.replyComment = jest.fn(() => Promise.resolve(mockStoredComment));

    const replyCommentUseCase = new ReplyCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      idGenerator: mockIdGenerator,
    });

    const storedReply = await replyCommentUseCase.execute(useCasePayload);

    expect(storedReply).toStrictEqual({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: useCasePayload.userId,
    });
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.replyComment).toBeCalledWith(
      useCasePayload.parentId,
      new StoreComment({
        id: 'reply-123',
        content: useCasePayload.content,
        threadId: useCasePayload.threadId,
        userId: useCasePayload.userId,
      }),
    );
  });
});
