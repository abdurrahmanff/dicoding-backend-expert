const Transformer = {
  buildCommentTree(rawComments, parentId) {
    const comments = rawComments.filter((row) => row.parent === parentId);
    if (comments.length === 0) return [];

    return comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: comment.getContent(),
      replies: this.buildCommentTree(rawComments, comment.id),
    }));
  },
};

module.exports = Transformer;
