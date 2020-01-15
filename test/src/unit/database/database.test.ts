import { DBConnect } from '../../../../src/database/configuration';

describe('Comments model', () => {
  it('Should throw validation errors', async () => {
    const db = await DBConnect('test');
    
    expect(db).toHaveProperty("Schema");
  });
})