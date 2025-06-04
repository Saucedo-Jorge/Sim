
import { Console } from "console";
import { db } from "../config/database";
import { Sequelize } from "sequelize"; // Adjust the path to your actual sequelize instance
import { ExamenModel } from "../model/examen";
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

const estuser = async (id:number) => {
    try {
        const examenes = await ExamenModel.findAll({
                        attributes: ['calificacion'],
                    where: {
                        id_usuario: id,
                        tipo_examen: 'prueba'
                    },
                    order: [['fecha_inicio', 'DESC']],
                    limit: 6
        });

        const [resultados, metadata] = await db.query(`
        SELECT
        SUM(CASE WHEN r.es_correcta = 1 THEN 1 ELSE 0 END) AS total_aciertos,
        SUM(CASE WHEN r.es_correcta = 0 THEN 1 ELSE 0 END) AS total_errores
        FROM 
        respuestas r
        INNER JOIN 
        examenes e ON r.id_examen = e.id_examen
        WHERE
        e.id_usuario = :id
        GROUP BY 
        e.id_usuario;`, {
        replacements: { id }, // <- usa tu variable aquí
        });

        


        return {examenes,resultados};
    } catch (error) {
        console.error("Error fetching user statistics:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

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

const infouser = async (id_usuario: number) => {
    try {
        const usuario = await UserModel.findByPk(id_usuario, {
      attributes: [
        "id_usuario",
        "nombre",
        "apellidop",
        "apellidom",
        "correo",
        "rol",
        "nivel_actual",
        "intentos_examen_final",
        "intentos_examen_prueba",]}
        );
         return usuario;
    } catch (error) {
        console.error("Error fetching usuario:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const updateusuario = async (id_usuario: number, nuevosDatos: Partial<UserModel>) => {
    try {
        console.log("Actualizando usuario con ID:", id_usuario);
        const usuario = await UserModel.findByPk(id_usuario);
        if (!usuario) {
            throw new Error("UserModel no encontrado");
        }

       await UserModel.update(nuevosDatos, {
            where: { id_usuario },
        });
        console.log("Usuario actualizado:", usuario);
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

export {insertUsuario ,getusuarios, getusuario, updateusuario, deleteusuario, estuser, infouser}; 