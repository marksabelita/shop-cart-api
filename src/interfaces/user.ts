import { Document } from 'mongoose';
import { IProduct } from './product'; 

export interface IUser extends Document {
  email: string, 
  firstName: string,
  lastName: string,
  address: string,
  phone: string,
  avatarUrl: string, 
  products: [ IProduct ],
  deleted: boolean
};