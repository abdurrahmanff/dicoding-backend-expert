class DetailComment {
  constructor({
    id, username, date, content, deleted, parent, likeCount = 0,
  }) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.deleted = deleted;
    this.parent = parent;
    this.likeCount = likeCount;
  }

  getContent() {
    if (this.parent && this.deleted) {
      return '**balasan telah dihapus**';
    }
    if (this.deleted) {
      return '**komentar telah dihapus**';
    }
    return this.content;
  }
}

module.exports = DetailComment;
