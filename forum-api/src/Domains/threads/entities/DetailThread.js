class DetailThread {
  constructor({
    id, title, body, date, username, comments,
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments;
  }
}

module.exports = DetailThread;
