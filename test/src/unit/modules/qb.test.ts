import { QB } from '../../../../src/utils/queryBuilder';
import  { User }  from '../../../../src/schema/user';
import { USER } from '../../../utils/variable'; 
import * as mongoose from 'mongoose';

describe('Comments model', () => {

  afterAll(() => {
    mongoose.connection.db.dropDatabase();
  })

  it('Should display list of user', async () => {
    const queryBuilder = new QB('test', User);
    const userList = await queryBuilder.getData({});

    const isResultArray = Array.isArray(userList);
    expect(isResultArray).toEqual(true);
  });

  it('Should create, show and delete a user', async () => {
    const queryBuilder = new QB('test', User);
    const data = {
      body: USER
    }

    const insertUserResult = await queryBuilder.storeData(data);
    expect(insertUserResult).toHaveProperty('_id');

    const user = {
      params:{
        id: insertUserResult._id
      },
      body: {
        followers: 3,
      }
    }

    const showUserResult = await queryBuilder.getData({});
    expect(showUserResult).toHaveProperty('_id');

    const updateUserResult = await queryBuilder.updateData(user);
    expect(updateUserResult).toHaveProperty('_id');
    expect(updateUserResult.followers).toEqual(3);

    const deleteUserResult = await queryBuilder.deleteData(user);
    expect(deleteUserResult).toHaveProperty('_id');

    const showUserResultUponDeletion = await queryBuilder.showData(user);
    expect(showUserResultUponDeletion).toBe(null);
  })
});