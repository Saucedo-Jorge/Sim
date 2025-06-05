import { RespuestaModel } from "../model/respuesta";
import { Sequelize } from "sequelize";


import { Request, Response } from "express";
import { db } from "../config/database";

const insertRespuesta = async (id_examen:number, respuestas : Partial<RespuestaModel>) => {
 

  try {
    // Verifica que haya respuestas
    if (!respuestas || !Array.isArray(respuestas)) {
        return { error: "No se proporcionaron respuestas válidas" };
    }

    // Inserta cada respuesta con su respectivo id_examen
    for (const r of respuestas) {
      await RespuestaModel.create({
        id_examen,
        id_pregunta: r.id_pregunta,
        respuesta_usuario: r.respuesta_usuario,
        es_correcta: r.es_correcta
      });
    }

    return { message: "Respuestas guardadas correctamente" };
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
    return { error: "Error al guardar respuestas" };
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


const hist = async (id :string) => {
    try {
        const [resultados, metadata] = await db.query(`
        SELECT * from respuestas r inner join  examenes e 
        on r.id_examen = e.id_examen where e.id_usuario= :id
        `, {
        replacements: { id }, // <- usa tu variable aquí
        });

        return resultados;
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

export {hist, insertRespuesta ,getrespuestas, getrespuesta, updaterespuesta, deleterespuesta, getrespuestasp, getrespuestasf};