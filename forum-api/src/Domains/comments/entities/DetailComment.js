class DetailComment {
  constructor({
    id, username, date, content, deleted, parent,
  }) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.deleted = deleted;
    this.parent = parent;
  }

  getContent() {
    // eslint-disable-next-line no-nested-ternary
    return this.deleted
      ? this.parent ? '**balasan telah dihapus**'
        : '**komentar telah dihapus**' : this.content;
  }
}

module.exports = DetailComment;
