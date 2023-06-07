class DetailComment {
  constructor({
    id, username, date, content, replies,
  }) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.replies = replies;
  }
}

module.exports = DetailComment;
