import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { ICart } from '../interfaces/cart';

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: false }
}, { timestamps: { createdAt: 'created_at' } });

export const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
