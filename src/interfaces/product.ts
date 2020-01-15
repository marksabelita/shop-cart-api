import { Document } from 'mongoose';
import { IUser } from './user';
import { ICart } from './cart';

export interface IProduct extends Document {
  name: string ,
  price: number,
  description: string,
  quantity: number,
  category: string,
  carts: [ ICart ],
  owner: IUser
};