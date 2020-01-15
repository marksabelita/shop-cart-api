import { Product }  from '../../../../src/schema/product';
import { IProduct } from '../../../../src/interfaces/product';
import { PRODUCT } from '../../../utils/variable';
import { DBConnect } from '../../../../src/database/configuration';

describe('Product model', () => {
  beforeAll(async () => {
    DBConnect('test');
  });

  it('Should throw validation errors', () => {
    const product = new Product();
    expect(product.validate).toThrow();
  });

  it('Should save a product', async () => {
    const product: IProduct = new Product(PRODUCT);
    const spy = jest.spyOn(product, 'save');
    product.save();
  
    expect(spy).toHaveBeenCalled();
    expect(product).toMatchObject({
      message: expect.any(String)
    });
  });
});