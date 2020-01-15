import { User }  from '../../../../src/schema/user';
import { IUser } from '../../../../src/interfaces/user';
import { USER } from '../../../utils/variable';
import { DBConnect } from '../../../../src/database/configuration';

describe('User model', () => {
  beforeAll(async () => {
    DBConnect('test');
  });

  it('Should throw validation errors', () => {
    const user = new User();
    expect(user.validate).toThrow();
  });

  it('Should save a user', async () => {
    const user: IUser = new User(USER);
    const spy = jest.spyOn(user, 'save');
    user.save();

    expect(spy).toHaveBeenCalled();
    expect(user).toMatchObject({
      email: expect.any(String),
      avatarUrl: expect.any(String),
      followers: expect.any(Number),
      following: expect.any(Number)
    });
    expect(user.email).toBe('mark@test.com');
  });
});