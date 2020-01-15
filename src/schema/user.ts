import * as mongoose from 'mongoose'; 
import { IUser } from '../interfaces/User';
import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  email: { type: String , required: true, unique: true },
  firstName: { type: String , required: true },
  lastName: { type: String , required: true },
  address: { type: String , required: true },
  phone: { type: String , required: true },
  avatarUrl: { type: String , required: true },
  deleted: { type: Boolean, default: false },
  products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ]
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);