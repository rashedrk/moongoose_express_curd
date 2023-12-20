import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
}, { _id: false })

const addressSchema = new Schema<TAddress>({
    street: { type: String },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
}, { _id: false });

const orderSchema = new Schema<TOrder>({
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Product price is required'] },
    quantity: { type: Number, required: [true, 'Product quantity is required'] },
}, { _id: false });

const userSchema = new Schema<TUser, UserModel>({
    userId: { type: Number, required: [true, 'User ID is required'], unique: true },
    username: { type: String, required: [true, 'Username is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'], select: 0 },
    fullName: { type: fullNameSchema, required: [true, 'Full name is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: { type: [orderSchema] },
    isDeleted: { type: Boolean, default: false },
});

//middlewares
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

//Query middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});


userSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await User.findOne({ userId: id });
    return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema);