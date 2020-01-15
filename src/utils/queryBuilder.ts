import { Model } from 'mongoose';
import { DBConnect } from '../database/configuration';

export class QB {
  protected schema: Model<any>;
  
  constructor(env, schema) {
    this.schema = schema;
    DBConnect(env);
  }

  public async getData(data, deleted = false) {
    const { body } = data; 
    if (body) {
      const query = this.schema.find({...body, deleted});
      if(data.select) { query.select(data.select); }
      if(data.populate) { 
        data.populate.forEach(element => {
          query.populate(element);
        });
      }

      return query;
    }
  }

  public async showData(data, deleted = false) {
    const { body } = data; 
    if (body) {
      const query = this.schema.findOne({...body, deleted});
      if(data.select) { query.select(data.select); }
      if(data.populate) { 
        data.populate.forEach(element => {
          query.populate(element);
        });
      }

      return query;
    }
  }

  public async storeData(request) {
    return this.schema.create(request.body);
  }

  public async updateData(request) {
    const { id } = request.params;
    const { body } = request;
    if (id) {
      return await this.schema.findByIdAndUpdate(id, body, {new: true});
    }
  }

  public async  deleteData(request) {
    const { id } = request.params;
    return this.schema.findByIdAndUpdate(id, {deleted: true}, {new: true});
  }
}