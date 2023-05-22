const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser', () => {
  it('should throw error when payload did not contain needed properties', () => {
    const payload = {
      username: 'username',
      fullname: 'user fullname',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTIES');
  });

  it('should throw error when payload did not meet data type specifications', () => {
    const payload = {
      id: 94219,
      username: 'username',
      fullname: 'user fullname',
    };

    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should create registeredUser object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'username',
      fullname: 'user fullname',
    };

    const registeredUser = new RegisteredUser(payload);

    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
