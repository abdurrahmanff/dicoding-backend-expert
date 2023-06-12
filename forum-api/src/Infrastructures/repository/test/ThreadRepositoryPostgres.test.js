const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const StoreThread = require('../../../Domains/threads/entities/StoreThread');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepository postgres implementation test', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should store thread to db', async () => {
      const storeThread = new StoreThread({
        id: 'thread-123',
        title: 'Thread Title',
        body: 'this is thread body',
        owner: 'user-123',
      });

      await UsersTableTestHelper.addUser({ id: 'user-123' });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      await threadRepositoryPostgres.addThread(storeThread);

      const thread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(thread).toHaveLength(1);
    });
    it('should return stored thread correctly', async () => {
      const storeThread = new StoreThread({
        id: 'thread-123',
        title: 'Thread Title',
        body: 'this is thread body',
        owner: 'user-123',
      });

      await UsersTableTestHelper.addUser({ id: 'user-123' });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      const storedThread = await threadRepositoryPostgres.addThread(storeThread);

      expect(storedThread).toStrictEqual(new StoreThread({
        id: 'thread-123',
        title: 'Thread Title',
        body: 'this is thread body',
        owner: 'user-123',
      }));
    });
  });

  describe('verifyThreadExist function', () => {
    it('should throw error when thread not exist', async () => {
      const threadId = 'thread-133';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });

      await expect(() => threadRepositoryPostgres.verifyThreadExist(threadId))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should not throw error when thread exist', async () => {
      const threadId = 'thread-123';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });

      await expect(threadRepositoryPostgres.verifyThreadExist(threadId))
        .resolves.not
        .toThrowError(NotFoundError);
    });
  });

  describe('getDetailThreadById function', () => {
    it('should return detail thread correctly', async () => {
      const threadId = 'thread-123';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      const date = new Date().toISOString();

      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'user A' });
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123', userId: 'user-123', date, title: 'judul', body: 'isi thread',
      });

      const detailThread = await threadRepositoryPostgres.getDetailThreadById(threadId);

      expect(detailThread).toStrictEqual(new DetailThread({
        id: threadId,
        title: 'judul',
        body: 'isi thread',
        date,
        username: 'user A',
        comments: [],
      }));
    });
  });
});
