import {Request, Response} from "express";
import {registerNewUser, loginUser} from "../service/auth";

const registerCtrl = async ({body}: Request, res: Response) => {
    const responseUser = await registerNewUser(body)
    res.send(responseUser);
};

const loginCtrl = async ({body}: Request, res: Response) => {
    
    const {correo, contrasena} = body;
    const responseUser = await loginUser({correo, contrasena}, res);
    
    if (responseUser === "Contraseña incorrecta") {
        res.status(401).send({error: responseUser});
    }
    if (responseUser === "Usuario no encontrado") {
        res.status(404).send({error: responseUser});
    }

    
    res.send(responseUser);
 };

 const logoutCtrl = async (req: Request, res: Response) => {
    res.clearCookie('token'); // Clear the cookie
    res.status(200).send({message: "Logged out successfully"}); // Send a response 
}
// to the client    


export { registerCtrl, loginCtrl, logoutCtrl };

