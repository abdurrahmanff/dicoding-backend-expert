const AddThreadUseCase = require('../AddThreadUseCase');
const StoreThread = require('../../../Domains/threads/entities/StoreThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddThreadUseCase test', () => {
  it('should return error when payload did not contain needed properties', async () => {
    const useCasePayload = {
      title: 'Thread Title',
      body: 'this is thread body',
    };
    const addThreadUseCasew = new AddThreadUseCase({});

    await expect(addThreadUseCasew.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should return error when payload did not meet data type specifications', async () => {
    const useCasePayload = {
      title: 'Thread Title',
      body: [],
      owner: 'user-123',
    };

    const addThreadUseCasew = new AddThreadUseCase({});

    await expect(addThreadUseCasew.execute(useCasePayload))
      .rejects
      .toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should orchestrating add thread action correctly', async () => {
    const useCasePayload = {
      title: 'Thread Title',
      body: 'this is thread body',
      owner: 'user-123',
    };

    const mockStoredThread = new StoreThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner,
    });

    const mockThreadRepository = new ThreadRepository();
    const mockIdGenerator = () => '123';

    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockStoredThread));

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
      idGenerator: mockIdGenerator,
    });

    const storedThread = await addThreadUseCase.execute(useCasePayload);

    expect(storedThread).toStrictEqual(new StoreThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner,
    }));
    expect(mockThreadRepository.addThread).toBeCalledWith(new StoreThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner,
    }));
  });
});
