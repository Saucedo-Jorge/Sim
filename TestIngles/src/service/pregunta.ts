import { PreguntaModel } from "../model/pregunta";
import { Sequelize } from "sequelize";
import { IStorage } from "../interface/storage.interface";


const insertPregunta = async (item:PreguntaModel, { fileName,  path }: IStorage) => {
    try {
        const filename = fileName || null;
        const pathFile = path || null;

        console.log("Insertando pregunta1:", item, "con path:", pathFile, "y filename:", filename);

        console.log("Insertando pregunta2:", item, "con path:", path, "y filename:", fileName);
        const pregunta = await PreguntaModel.create({ ...item, path, filename } as any);
        return pregunta;
    } catch (error) {
        console.error("Error inserting pregunta:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}; 

const getpreguntas = async () => {
    try {
        const preguntas = await PreguntaModel.findAll();
        return preguntas;
    } catch (error) {
        console.error("Error fetching preguntas:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN PRUEBA
const getpreguntasp = async (cantidad = 20) => {
    try {
        const preguntas = await PreguntaModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return preguntas;
    } catch (error) {
        console.error("Error fetching preguntas:", error);
        throw error;
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN FINAL
const getpreguntasf = async (cantidad = 40) => {
    try {
        const preguntas = await PreguntaModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return preguntas;
    } catch (error) {
        console.error("Error fetching preguntas:", error);
        throw error;
    }
}


const getpregunta = async (id_pregunta: string) => {
    try {
        const pregunta = await PreguntaModel.findByPk(id_pregunta);
        if (!pregunta) {
            throw new Error("Pregunta no encontrado");
        }
        return pregunta;
    } catch (error) {
        console.error("Error fetching pregunta:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const updatepregunta = async (id_pregunta: string, nuevosDatos: Partial<PreguntaModel>) => {
    try {
        const pregunta = await PreguntaModel.findByPk(id_pregunta);
        if (!pregunta) {
            throw new Error("Pregunta no encontrado");
        }

        await pregunta.update(nuevosDatos);
        return pregunta;
    } catch (error) {
        console.error("Error updating pregunta:", error);
        throw error;
    }
};

const deletepregunta = async (id_pregunta: number) => {
    try {
        const pregunta = await PreguntaModel.findByPk(id_pregunta);
        if (!pregunta) {
            throw new Error("Pregunta no encontrado");
        }

        await pregunta.destroy();

        return { message: "Pregunta eliminada correctamente" };
    } catch (error) {
        console.error("Error deleting pregunta:", error);
        throw error;
    }
};

export {insertPregunta ,getpreguntas, getpregunta, updatepregunta, deletepregunta, getpreguntasp, getpreguntasf};