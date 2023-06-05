const autoBind = require('auto-bind');
const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

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
}

module.exports = ThreadsHandler;
