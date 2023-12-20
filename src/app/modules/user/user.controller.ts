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
            success: true,
            message: "User created successfully!",
            error
        })
    }
}

export const userControllers = {
    createUser,
}