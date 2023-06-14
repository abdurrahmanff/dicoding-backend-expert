const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const LikeRepository = require('../../../Domains/likes/LikeRepository');

describe('GetDetailThread test', () => {
  it('should throw error when payload did not contain needed properties', async () => {
    const useCasePayload = {};

    const getDetailThreadUseCase = new GetDetailThreadUseCase({});

    await expect(() => getDetailThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTIES');
  });

  it('should throw error when payload did not meet data specification criteria', async () => {
    const useCasePayload = {
      threadId: {},
    };

    const getDetailThreadUseCase = new GetDetailThreadUseCase({});

    await expect(() => getDetailThreadUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('DETAIL_THREAD.DID_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating get detail thread use case properly', async () => {
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const mockDetailThread = new DetailThread({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
      comments: [],
    });

    const mockComments = [
      new DetailComment({
        id: 'comment-123',
        username: 'dicoding',
        date: '2023-06-07T14:16:49.780Z',
        content: 'sebuah comment',
        deleted: false,
        parent: null,
      }),
      new DetailComment({
        id: 'comment-124',
        username: 'dicoding',
        date: '2023-06-07T15:20:49.780Z',
        content: 'sebuah comment',
        deleted: false,
        parent: null,
      }),
      new DetailComment({
        id: 'reply-123',
        username: 'dicoding',
        date: '2023-06-07T15:16:49.780Z',
        content: 'sebuah reply',
        deleted: true,
        parent: 'comment-123',
      }),
      new DetailComment({
        id: 'reply-124',
        username: 'dicoding',
        date: '2023-06-08T15:16:49.780Z',
        content: 'sebuah reply',
        deleted: false,
        parent: 'comment-123',
      }),
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockThreadRepository.getDetailThreadById = jest.fn(() => Promise.resolve(mockDetailThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(mockComments));
    mockLikeRepository.getLikeFromComment = jest.fn(() => Promise.resolve(5));

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    const thread = await getDetailThreadUseCase.execute(useCasePayload);

    expect(thread).toStrictEqual(new DetailThread({
      id: useCasePayload.threadId,
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '2023-06-07T14:16:49.780Z',
          content: 'sebuah comment',
          likeCount: 5,
          replies: [
            {
              id: 'reply-123',
              username: 'dicoding',
              date: '2023-06-07T15:16:49.780Z',
              content: '**balasan telah dihapus**',
              likeCount: 5,
              replies: [],
            },
            {
              id: 'reply-124',
              username: 'dicoding',
              date: '2023-06-08T15:16:49.780Z',
              content: 'sebuah reply',
              likeCount: 5,
              replies: [],
            },
          ],
        },
        {
          id: 'comment-124',
          username: 'dicoding',
          date: '2023-06-07T15:20:49.780Z',
          content: 'sebuah comment',
          likeCount: 5,
          replies: [],
        },
      ],
    }));

    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockThreadRepository.getDetailThreadById).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload.threadId);
    expect(mockLikeRepository.getLikeFromComment).toBeCalledTimes(mockComments.length);
  });
});
