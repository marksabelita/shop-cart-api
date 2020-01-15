import { BaseController } from './BaseController';
import { Product } from '../schema/product';
import { User } from '../schema/user';
import { ResponseHandler } from '../utils/responseHandler';
import { QB } from '../utils/queryBuilder';
const responseHandler = new ResponseHandler();
const ENV = (process.env.NODE_ENV) || 'local';

export class ProductController extends BaseController{
  constructor() {
    super(ENV, Product);
  }

  public async index(request, response){
    try {
      const results = await this.queryBuilder.getData({body: {}});
      const newResult = JSON.parse(JSON.stringify(results));
      const updatedResult = newResult.map(element => {
        return {
          ...element,
          cartCount: element.carts.length
        }
     });
     
     responseHandler.sendResponse(response, updatedResult);
    } catch (error){
      responseHandler.catchErrors(response, error);
    }    
  }

   public async store(request, response){
    try {
      const { owner } = request.body;
      const inserProductResult = await this.queryBuilder.storeData(request);
      const { id } = inserProductResult;
      const postProductData = {
        params: {
          id: owner
        },
        body : { $push: { products: { _id: id } }}
      }
      const userQB = new QB(ENV, User)
      const inserProductToUser = await userQB.updateData(postProductData);

      const result = { inserProductResult, inserProductToUser }
      responseHandler.sendResponse(response, result);
    } catch (error){
      responseHandler.catchErrors(response, error);
    }
  }

  public async getByQuery(request, response) {
    try {
      const { query } = request.params;

      const requestData = {
        body: {
          $or: [
            { name: { $regex: query, $options: 'i' } }, 
            { description: { $regex: query, $options: 'i' } }
          ]
        },
        populate: [{ path: 'owner',  match: {deleted: false} }, { path: 'carts' }],
      }

      const results = await this.queryBuilder.getData(requestData);

      const newResult = JSON.parse(JSON.stringify(results));
      const updatedResult = newResult.map(element => {
        return {
          ...element,
          cartCount: element.carts.length
        }
      });
     
      responseHandler.sendResponse(response, updatedResult);
    } catch (error) {
      responseHandler.catchErrors(response, error);
    }
  }
}