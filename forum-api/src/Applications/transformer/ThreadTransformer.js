const DetailComment = require('../../Domains/comments/entities/DetailComment');
const DetailThread = require('../../Domains/threads/entities/DetailThread');

const ThreadTransformer = {
  transform(rawThread) {
    const thread = new DetailThread({
      id: rawThread[0].id,
      title: rawThread[0].title,
      body: rawThread[0].body,
      date: rawThread[0].date,
      username: rawThread[0].t_user,
      comments: [],
    });

    thread.comments = this.buildCommentTree(rawThread, null);
    return thread;
  },

  buildCommentTree(rawThread, parentId) {
    const comments = rawThread.filter((row) => row.c_parent === parentId);
    if (comments.length === 0) return [];

    return comments.map((comment) => new DetailComment({
      id: comment.c_id,
      username: comment.c_user,
      date: comment.c_date,
      // eslint-disable-next-line no-nested-ternary
      content: comment.deleted
        ? parentId ? '**balasan telah dihapus**'
          : '**komentar telah dihapus**' : comment.content,
      replies: this.buildCommentTree(rawThread, comment.c_id),
    }));
  },
};

module.exports = ThreadTransformer;
