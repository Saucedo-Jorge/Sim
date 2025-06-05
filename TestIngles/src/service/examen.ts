import { ExamenModel } from "../model/examen";
import { Sequelize } from "sequelize";


const insertExamen = async (item:ExamenModel) => {
    try {
        const examen = await ExamenModel.create({ ...item } as any);
        console.log("Examen creado correctamente serv:", examen);
        return examen;
    } catch (error) {
        console.error("Error inserting examen:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}; 

const getexamenes = async () => {
    try {
        const examenes = await ExamenModel.findAll();
        return examenes;
    } catch (error) {
        console.error("Error fetching examenes:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN PRUEBA
const getexamenesp = async (cantidad = 20) => {
    try {
        const examenes = await ExamenModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return examenes;
    } catch (error) {
        console.error("Error fetching examenes:", error);
        throw error;
    }
}

// OBTENEMOS LAS PREGUNTAS DE EXAMEN FINAL
const getexamenesf = async (cantidad = 40) => {
    try {
        const examenes = await ExamenModel.findAll({
            order: Sequelize.literal('RAND()'), 
            limit: cantidad
        });
        return examenes;
    } catch (error) {
        console.error("Error fetching examenes:", error);
        throw error;
    }
}

const getexamen = async (id_examen: string) => {
    try {
        const examen = await ExamenModel.findByPk(id_examen);
        if (!examen) {
            throw new Error("Examen no encontrado");
        }
        return examen;
    } catch (error) {
        console.error("Error fetching examen:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

const updateexamen = async (id_examen: number, nuevosDatos: Partial<ExamenModel>) => {
    try {
        const examen = await ExamenModel.findByPk(id_examen);
        if (!examen) {
            throw new Error("Examen no encontrado");
        }

      await ExamenModel.update(nuevosDatos, {
            where: { id_examen}
        });
    } catch (error) {
        console.error("Error updating examen:", error);
        throw error;
    }
};

const deleteexamen = async (id_examen: number) => {
    try {
        const examen = await ExamenModel.findByPk(id_examen);
        if (!examen) {
            throw new Error("Examen no encontrado");
        }

        await examen.destroy();

        return { message: "Examen eliminada correctamente" };
    } catch (error) {
        console.error("Error deleting examen:", error);
        throw error;
    }
};

export {insertExamen ,getexamenes, getexamen, updateexamen, deleteexamen, getexamenesp, getexamenesf};