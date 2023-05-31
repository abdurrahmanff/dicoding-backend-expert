class StoreComment {
  constructor(payload) {
    const {
      id, content, threadId, userId,
    } = payload;

    this.id = id;
    this.content = content;
    this.threadId = threadId;
    this.userId = userId;
  }
}

module.exports = StoreComment;
