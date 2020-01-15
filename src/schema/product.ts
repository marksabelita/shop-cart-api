import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantiy: { type: Number, required: true },
  category: { type: String , required: true },
  carts: [ { type: Schema.Types.ObjectId, ref: 'Cart' } ],
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
