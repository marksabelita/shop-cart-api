import { Cart }  from '../../../../src/schema/cart';
import { ICart } from '../../../../src/interfaces/cart';
import { CART } from '../../../utils/variable';
import { DBConnect } from '../../../../src/database/configuration';

describe('Cart model', () => {
  beforeAll(async () => {
    DBConnect('test');
  });

  it('Should throw validation errors', () => {
    const product = new Cart();
    expect(product.validate).toThrow();
  });

  it('Should save a product', async () => {
    const product: ICart = new Cart(CART);
    const spy = jest.spyOn(product, 'save');
    product.save();
  
    expect(spy).toHaveBeenCalled();
    expect(product).toMatchObject({
      message: expect.any(String)
    });
  });
});