import { RespuestaModel } from "../model/respuesta";
import { Sequelize } from "sequelize";


const insertRespuesta = async (item:RespuestaModel) => {
    try {
        const respuesta = await RespuestaModel.create({ ...item } as any);
        return respuesta;
    } catch (error) {
        console.error("Error inserting respuesta:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}; 

const getrespuestas = async () => {
    try {
        const respuestas = await RespuestaModel.findAll();
        return respuestas;
    } catch (error) {
        console.error("Error fetching respuestas:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN PRUEBA
const getrespuestasp = async (cantidad = 20) => {
    try {
        const respuestas = await RespuestaModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return respuestas;
    } catch (error) {
        console.error("Error fetching respuestas:", error);
        throw error;
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN FINAL
const getrespuestasf = async (cantidad = 40) => {
    try {
        const respuestas = await RespuestaModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return respuestas;
    } catch (error) {
        console.error("Error fetching respuestas:", error);
        throw error;
    }
}

const getrespuesta = async (id_respuesta: string) => {
    try {
        const respuesta = await RespuestaModel.findByPk(id_respuesta);
        if (!respuesta) {
            throw new Error("Respuesta no encontrado");
        }
        return respuesta;
    } catch (error) {
        console.error("Error fetching respuesta:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const updaterespuesta = async (id_respuesta: string, nuevosDatos: Partial<RespuestaModel>) => {
    try {
        const respuesta = await RespuestaModel.findByPk(id_respuesta);
        if (!respuesta) {
            throw new Error("Respuesta no encontrado");
        }

        await respuesta.update(nuevosDatos);
        return respuesta;
    } catch (error) {
        console.error("Error updating respuesta:", error);
        throw error;
    }
};

const deleterespuesta = async (id_respuesta: number) => {
    try {
        const respuesta = await RespuestaModel.findByPk(id_respuesta);
        if (!respuesta) {
            throw new Error("Respuesta no encontrado");
        }

        await respuesta.destroy();

        return { message: "Respuesta eliminada correctamente" };
    } catch (error) {
        console.error("Error deleting respuesta:", error);
        throw error;
    }
};

export {insertRespuesta ,getrespuestas, getrespuesta, updaterespuesta, deleterespuesta, getrespuestasp, getrespuestasf};