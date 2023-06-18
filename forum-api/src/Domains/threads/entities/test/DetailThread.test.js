const DetailThread = require('../DetailThread');

describe('DetailThread test', () => {
  it('should create DetailThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'Thread Title',
      body: 'Thread body ni boss xdd',
      date: 'now',
      username: 'user a',
      comments: [
        {
          id: 'comment-123',
          username: 'user b',
          date: 'now + 2 sec',
          content: 'komentar 1',
        },
        {
          id: 'comment-124',
          username: 'user c',
          date: 'now + 5 sec',
          content: 'komentar 2',
        },
      ],
    };

    const detailThread = new DetailThread(payload);

    expect(detailThread).toStrictEqual(new DetailThread({
      ...payload,
    }));
  });
});
