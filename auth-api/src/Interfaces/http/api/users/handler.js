const autoBind = require('auto-bind');
const AddUserUseCase = require('../../../../Applications/usecase/AddUserUseCase');

class UsersHandler {
  constructor(container) {
    this.container = container;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this.container.getInstatnce(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
