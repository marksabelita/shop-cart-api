import { Document } from 'mongoose';
import { IUser } from './user';
import { IProduct } from './product';


export interface ICart extends Document {
  quantity: number,
  user: IUser,
  product: IProduct
};