import { BaseController } from './BaseController';
import { Cart } from '../schema/cart';
import { ResponseHandler } from '../utils/responseHandler';
import { QB } from '../utils/queryBuilder';
import { Product } from '../schema/product';
const responseHandler = new ResponseHandler();
const ENV = (process.env.NODE_ENV) || 'local';

export class CartController extends BaseController{
  constructor() {
    super(ENV, Cart);
  }

  public async store(request, response){
    try {
      const { product } = request.body;
      const productQB = new QB(ENV, Product); 
      const cartResult = await this.queryBuilder.storeData(request);
      const { id } = cartResult;
      const postProductData = {
        params: {
          id: product
        },
        body : { $push: { carts: { _id: id } }}
      }

      const insertCartToProductResult = await productQB.updateData(postProductData);

      const result = { cartResult, insertCartToProductResult }
      responseHandler.sendResponse(response, result);
    } catch (error){
      responseHandler.catchErrors(response, error);
    }
  }
}