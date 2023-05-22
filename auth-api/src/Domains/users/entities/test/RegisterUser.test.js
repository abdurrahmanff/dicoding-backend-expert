const RegisterUser = require('../RegisterUser');

describe('RegisterUser', () => {
  it('should throw error when payload did not contain needed properties', () => {
    const payload = {
      username: 'user',
      password: 'xddinside',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'user',
      password: 12345,
      fullname: {},
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATIONS');
  });

  it('should throw error when username contains more than 50 characters', () => {
    const payload = {
      username: 'loremloremloremloremloremloremloremloremloremloremlorem',
      password: 'xddinside',
      fullname: 'user fullname',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted characters', () => {
    const payload = {
      username: 'user name',
      password: 'xddinside',
      fullname: 'user fullname',
    };

    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAINS_RESTRICTED_CHAR');
  });

  it('should create registerUser object correctly', () => {
    const payload = {
      username: 'username',
      password: 'xddinside',
      fullname: 'user fullname',
    };

    const registerUser = new RegisterUser(payload);

    expect(registerUser.username).toEqual(payload.username);
    expect(registerUser.password).toEqual(payload.password);
    expect(registerUser.fullname).toEqual(payload.fullname);
  });
});
