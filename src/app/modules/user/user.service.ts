import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
}
const getAllUsersFromDB = async () => {
    const result = await User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });
    return result;
}
const getUserFromDB = async (id: string) => {
    const result = await User.find({ userId: id }, { userId: 1, username: 1, fullName: 1, age: 1, email: 1, isActive: 1, hobbies: 1, address: 1, _id: 0 });
    return result;
}

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserFromDB
}