import { DBConnect } from '../database/configuration';
import { ResponseHandler } from '../utils/responseHandler';
import { QB } from '../utils/queryBuilder';
const responseHandlerUtils = new ResponseHandler();

export class BaseController {
  protected ENV: string;
  public queryBuilder;

  constructor(env, schema) {
    this.queryBuilder = new QB(env, schema);
    DBConnect(env);
  }

  public async index(request, response){
    try {
      const data = await this.queryBuilder.getData({body: {}});
      responseHandlerUtils.sendResponse(response, data);
    } catch (error){
      responseHandlerUtils.catchErrors(response, error);
    }    
  }

  public async store(request, response){
    try {
      const data = await this.queryBuilder.storeData(request);
      responseHandlerUtils.sendResponse(response, data);
    } catch (error){
      responseHandlerUtils.catchErrors(response, error);
    }
  }

  public async update(request, response) {
    try {
      const data = await this.queryBuilder.updateData(request);
      responseHandlerUtils.sendResponse(response, data);
    } catch (error) {
      responseHandlerUtils.catchErrors(response, error);
    }
  }

  public async show(request, response) {
    try {
      const { id } = request.params;
      const requestData = {
        body: {
          _id: id
        }
      }

      const data = await this.queryBuilder.showData(requestData);
      responseHandlerUtils.sendResponse(response, data);
    } catch (error) {
      responseHandlerUtils.catchErrors(response, error);
    }
  }

  public async delete(request, response){
    try {
      const data = await this.queryBuilder.deleteData(request);
      responseHandlerUtils.sendResponse(response, data);
    } catch (error) {
      responseHandlerUtils.catchErrors(response, error);
    }
  }
}