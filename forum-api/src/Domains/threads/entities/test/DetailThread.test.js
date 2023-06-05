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

    expect(detailThread.id).toEqual(payload.id);
    expect(detailThread.title).toEqual(payload.title);
    expect(detailThread.body).toEqual(payload.body);
    expect(detailThread.date).toEqual(payload.date);
    expect(detailThread.username).toEqual(payload.username);
    expect(detailThread.comments).toStrictEqual(payload.comments);
  });
});
