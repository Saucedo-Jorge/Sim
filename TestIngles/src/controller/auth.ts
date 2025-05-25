import {Request, Response} from "express";
import {registerNewUser, loginUser} from "../service/auth";

const registerCtrl = async ({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser);
};

const loginCtrl = async (req: Request, res: Response) => {};

export { registerCtrl, loginCtrl };


