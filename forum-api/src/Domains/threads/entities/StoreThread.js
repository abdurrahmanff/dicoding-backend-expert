class StoreThread {
  constructor(payload) {
    this.verifyPayload(payload);

    const {
      id, title, body, owner,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.owner = owner;
  }

  verifyPayload(payload) {
    const { title } = payload;

    if (title.length > 50) {
      throw new Error('STORE_THREAD.TITLE_LIMIT_CHAR');
    }
  }
}

module.exports = StoreThread;
