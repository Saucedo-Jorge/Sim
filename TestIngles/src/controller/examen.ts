import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interface/requestExt.interface";
import { deleteexamen, getexamen, getexamenes, getexamenesf, getexamenesp, insertExamen, updateexamen } from "../service/examen";

const getItem = async ({params}: Request, res: Response) => {
    try {
        console.log("PARAMS", params);
        const id_examen = params.id; // Use params.id directly
        console.log("ID_PREGUNTA", id_examen);

        const responseUser = await getexamen(id_examen);
        res.send(responseUser);

    }
    catch (e){

        handleHttp(res, "ERROR_GET_ITEM");

    }

};

const getItems = async (req: Request, res: Response) => {
    try {

        const responseUser = await getexamenes();
        res.send({data: responseUser});
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsp = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getexamenesp()
    res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsf = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getexamenesf()
        res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const postItem = async({body}: Request, res: Response) => {
    try {

        const a = await insertExamen(body);
        console.log(body);
        res.send( body );

    }
    catch (e){
        handleHttp(res, "ERROR_CREATE_ITEM");

    }

};

const updateItem = ({body}: Request, res: Response) => {
    try {

        const id_examen = body.id_examen; 

       
        const response = updateexamen(id_examen, body);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_UPDATE_ITEM");

    }

};

const deleteItem = ({body}: Request, res: Response) => {
    try {

        const response = deleteexamen(body.id_examen);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_DELETE_ITEM");

    }

};

export { getItem, getItems, postItem, updateItem, deleteItem, getItemsp, getItemsf, };