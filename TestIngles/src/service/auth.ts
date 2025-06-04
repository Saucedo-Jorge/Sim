import { IAuth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import { UserModel } from "../model/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { Response } from "express";

const registerNewUser = async (authUser: User) => {
    const checkUser = await UserModel.findOne({
        where: {
            
            correo: authUser.correo
        }
    });

    if (checkUser) {
        throw new Error('El usuario ya existe');
    }

    // Hash the password
    const passHash = await encrypt(authUser.contrasena);
    const newUser = await UserModel.create({
        ...authUser,
        contrasena: passHash
    });

    return newUser;

}

const loginUser = async ({correo, contrasena}: IAuth, res : Response) => {
    const checkUser = await UserModel.findOne({
        where: {
            correo:  correo
        }
    });
    if (!checkUser) {
        return('Usuario no encontrado');
    }

    const passwordHash = checkUser.contrasena;
    const isValid = await verified(contrasena, passwordHash);

    if (!isValid) {
        return('Contraseña incorrecta');
    }

const token = generateToken(String(checkUser.id_usuario), checkUser.nombre,checkUser.rol, checkUser.intentos_examen_final, checkUser.intentos_examen_prueba, res);
    if (!token) {
        throw new Error('Error al generar el token');
    }
    return {   token}
};

export { registerNewUser, loginUser };

