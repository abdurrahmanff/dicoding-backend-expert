const autoBind = require('auto-bind');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const GetDetailThreadUseCase = require('../../../../Applications/use_case/GetDetailThreadUseCase');
const ReplyCommentUseCase = require('../../../../Applications/use_case/ReplyCommentUseCase');
const AddLikeUseCase = require('../../../../Applications/use_case/AddLikeUseCase');

class ThreadsHandler {
  constructor(container) {
    this.container = container;

    autoBind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this.container.getInstance(AddThreadUseCase.name);

    const { id: userId } = request.auth.credentials;

    const addedThread = await addThreadUseCase.execute({ ...request.payload, owner: userId });

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async postCommentOnThreadById(request, h) {
    const addCommentUseCase = this.container.getInstance(AddCommentUseCase.name);

    const { threadId } = request.params;
    const { id: userId } = request.auth.credentials;

    const addedComment = await addCommentUseCase.execute({ ...request.payload, threadId, userId });

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentOnThreadById(request) {
    const deleteCommentuseCase = this.container.getInstance(DeleteCommentUseCase.name);

    const { commentId } = request.params;
    const { id: userId } = request.auth.credentials;

    await deleteCommentuseCase.execute({ commentId, userId });

    return {
      status: 'success',
    };
  }

  async getThreadById(request) {
    const getDetailThreadUseCase = this.container.getInstance(GetDetailThreadUseCase.name);

    const { threadId } = request.params;

    const thread = await getDetailThreadUseCase.execute({ threadId });

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }

  async postReplyComment(request, h) {
    const replyCommentUseCase = this.container.getInstance(ReplyCommentUseCase.name);

    const { threadId, commentId } = request.params;

    const { id: userId } = request.auth.credentials;

    const addedReply = await replyCommentUseCase.execute({
      threadId,
      parentId: commentId,
      ...request.payload,
      userId,
    });

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplyOnCommentById(request) {
    const deleteCommentUseCase = this.container.getInstance(DeleteCommentUseCase.name);

    const { replyId } = request.params;
    const { id: userId } = request.auth.credentials;

    await deleteCommentUseCase.execute({ commentId: replyId, userId });

    return {
      status: 'success',
    };
  }

  async putLikeCommentOnThread(request) {
    const addLikeUseCase = this.container.getInstance(AddLikeUseCase.name);

    const { commentId, threadId } = request.params;
    const { id: userId } = request.auth.credentials;

    await addLikeUseCase.execute({ threadId, commentId, userId });

    return {
      status: 'success',
    };
  }
}

module.exports = ThreadsHandler;
