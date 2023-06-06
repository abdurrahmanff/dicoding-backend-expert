const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

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
      comments: [
        new DetailComment({
          id: 'comment-123',
          username: 'johndoe',
          date: '2021-08-08T07:22:33.555Z',
          content: 'sebuah comment',
        }),
        new DetailComment({
          id: 'comment-126',
          username: 'dicoding',
          date: '2021-08-08T07:26:21.338Z',
          content: '**komentar telah dihapus**',
        }),
      ],
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getDetailThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailThread));

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const detailThread = await getDetailThreadUseCase.execute(useCasePayload);

    expect(detailThread).toStrictEqual(new DetailThread({
      id: useCasePayload.threadId,
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'dicoding',
      comments: [
        new DetailComment({
          id: 'comment-123',
          username: 'johndoe',
          date: '2021-08-08T07:22:33.555Z',
          content: 'sebuah comment',
        }),
        new DetailComment({
          id: 'comment-126',
          username: 'dicoding',
          date: '2021-08-08T07:26:21.338Z',
          content: '**komentar telah dihapus**',
        }),
      ],
    }));

    expect(mockThreadRepository.getDetailThreadById).toBeCalledWith(useCasePayload.threadId);
  });
});
