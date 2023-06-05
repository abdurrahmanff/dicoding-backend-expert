const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const StoreThread = require('../../../Domains/threads/entities/StoreThread');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

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

  describe('verifyyThreadExist function', () => {
    it('should throw error when thread not exist', async () => {
      const threadId = 'thread-133';

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', userId: 'user-123' });

      await expect(threadRepositoryPostgres.verifyThreadExist(threadId))
        .rejects
        .toThrowError('thread tidak ditemukan');
    });
  });
});
