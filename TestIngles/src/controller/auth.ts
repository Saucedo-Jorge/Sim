import {Request, Response} from "express";
import {registerNewUser, loginUser} from "../service/auth";

const registerCtrl = async ({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser);
};

const loginCtrl = async ({body}: Request, res: Response) => {
    const {correo, contrasena} = body;
    const responseUser = await loginUser({correo, contrasena});
    
    if (responseUser === "Contraseña incorrecta") {
        res.status(401).send({error: responseUser});
    }
    if (responseUser === "Usuario no encontrado") {
        res.status(404).send({error: responseUser});
    }

    res.send(responseUser);
 };

export { registerCtrl, loginCtrl };


