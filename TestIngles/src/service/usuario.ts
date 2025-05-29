import { UserModel } from "../model/user";


const insertUsuario = async (item:UserModel) => {
    try {
        const usuario = await UserModel.create({ ...item } as any);
        return usuario;
    } catch (error) {
        console.error("Error inserting usuario:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}; 

const getusuarios = async () => {
    try {
        const usuarios = await UserModel.findAll();
        return usuarios;
    } catch (error) {
        console.error("Error fetching usuarios:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const getusuario = async (id_usuario: number) => {
    try {
        const usuario = await UserModel.findByPk(id_usuario);
        return usuario;
    } catch (error) {
        console.error("Error fetching usuario:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const updateusuario = async (id_usuario: number, nuevosDatos: Partial<UserModel>) => {
    try {
        const usuario = await UserModel.findByPk(id_usuario);
        if (!usuario) {
            throw new Error("UserModel no encontrado");
        }

        await usuario.update(nuevosDatos);
        return usuario;
    } catch (error) {
        console.error("Error updating usuario:", error);
        throw error;
    }
};

const deleteusuario = async (id_usuario: number) => {
    try {
        const usuario = await UserModel.findByPk(id_usuario);
        if (!usuario) {
            throw new Error("User no encontrado");
        }

        await usuario.destroy();
        return { message: "Usuario eliminado correctamente" };
    } catch (error) {
        console.error("Error deleting usuario:", error);
        throw error;
    }
};

export {insertUsuario ,getusuarios, getusuario, updateusuario, deleteusuario};