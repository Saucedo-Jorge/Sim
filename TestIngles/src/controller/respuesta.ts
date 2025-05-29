import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interface/requestExt.interface";
import { deleterespuesta, getrespuesta, getrespuestas, getrespuestasf, getrespuestasp, insertRespuesta, updaterespuesta } from "../service/respuesta";

const getItem = async ({params}: Request, res: Response) => {
    try {
        console.log("PARAMS", params);
        const id_respuesta = params.id; // Use params.id directly
        console.log("ID_PREGUNTA", id_respuesta);

        const responseUser = await getrespuesta(id_respuesta);
        res.send(responseUser);

    }
    catch (e){

        handleHttp(res, "ERROR_GET_ITEM");

    }

};

const getItems = async (req: Request, res: Response) => {
    try {

        const responseUser = await getrespuestas();
        res.send({data: responseUser});
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsp = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getrespuestasp()
    res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsf = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getrespuestasf()
        res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const postItem = async({body}: Request, res: Response) => {
    try {

        const a = await insertRespuesta(body);
        console.log(body);
        res.send( body );

    }
    catch (e){
        handleHttp(res, "ERROR_CREATE_ITEM");

    }

};

const updateItem = ({body}: Request, res: Response) => {
    try {

        const id_respuesta = body.id_respuesta; 

       
        const response = updaterespuesta(id_respuesta, body);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_UPDATE_ITEM");

    }

};

const deleteItem = ({body}: Request, res: Response) => {
    try {

        const response = deleterespuesta(body.id_respuesta);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_DELETE_ITEM");

    }

};

export { getItem, getItems, postItem, updateItem, deleteItem, getItemsp, getItemsf, };