import { IAuth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import { UserModel } from "../model/user";

const registerNewUser = async (authUser: User) => {
    const checkUser = await UserModel.findOne({
        where: {
            
            correo: authUser.correo
        }
    });

    if (checkUser) {
        throw new Error('El usuario ya existe');
    }

    const newUser = await UserModel.create({
        ...authUser,
        nivel_actual: 'basico',
        intentos_examen_prueba: 5,
        intentos_examen_final: 3
    });

    return newUser;

}

const loginUser = async (credentials: any) => {
};

export { registerNewUser, loginUser };