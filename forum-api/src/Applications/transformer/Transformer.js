const Transformer = {
  buildCommentTree(rawComments, parentId) {
    const comments = rawComments.filter((row) => row.parent === parentId);

    return comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: comment.getContent(),
      replies: this.buildCommentTree(rawComments, comment.id),
      likeCount: comment.likeCount,
    }));
  },
};

module.exports = Transformer;
