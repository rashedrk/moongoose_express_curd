import { Schema, model } from 'mongoose';
import { TAddress, TOrder, TUser } from './user.interface';

const fullNameSchema = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}

const addressSchema = new Schema<TAddress>({
    street: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema =  new Schema<TUser>({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: [String],
    address: {type: addressSchema, required: true},
    orders: [orderSchema],
});

export const User = model<TUser>('User', userSchema);