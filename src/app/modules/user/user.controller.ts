import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        // validation using zod 
        const zodParsedData = userValidationSchema.parse(user);

        const result = await userServices.createUserIntoDB(zodParsedData);

        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User creation failed!",
            error
        })
    }
};

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Users fetched failed!",
            error: error
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.getUserFromDB(userId);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data: result
            })
        }
        else {
           throw Error
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
};


export const userControllers = {
    createUser,
    getAllUser,
    getUser
}