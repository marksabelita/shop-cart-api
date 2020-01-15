import { BaseController } from './BaseController';
import { ResponseHandler } from '../utils/responseHandler';
import { User } from '../schema/user';
const responseHandler = new ResponseHandler();
const ENV = (process.env.NODE_ENV) || 'local';

export class ReportsController extends BaseController{
  constructor() {
    super(ENV, User);
  }

  public async getTopSeller(request, response) {
    try {
      const requestData = {
        body: { },
        populate: [{ 
          path: 'products',
          match: {deleted: false},
          populate : {
            path : 'carts'
          }
        }]
      }

      const result = await this.queryBuilder.getData(requestData);
      const processedResult = this.processData(result);
      const sortedResult = this.sortDescByTotalCart(processedResult);
      
      responseHandler.sendResponse(response, sortedResult);
    } catch (error) {
      responseHandler.catchErrors(response, error);
    }
  }

  private processData(data) {
    const newData = JSON.parse(JSON.stringify(data));
    const updatedResult = newData.map(userData => {
      const { products } = userData;
      const newProduct = products.map(product => {
        const { carts } = product;
        const sum = carts.map(cart => cart.quantity).reduce((a, b) => a + b, 0);
        return sum;
      })

      return { ...userData, totalCart: newProduct.reduce((a, b) => a + b, 0) };
    });

    return updatedResult;
  }

  private sortDescByTotalCart(data){
    return data.sort(function (p1, p2) {
      return  p2.age - p1.age;
    })
  }
}