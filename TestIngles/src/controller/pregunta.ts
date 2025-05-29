import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interface/requestExt.interface";
import { IStorage } from "../interface/storage.interface";
import { deletepregunta, getpregunta, getpreguntas, getpreguntasf, getpreguntasp, insertPregunta, updatepregunta, } from "../service/pregunta";
import { Console } from "console";


const getItem = async ({params}: Request, res: Response) => {
    try {
        console.log("PARAMS", params);
        const id_pregunta = params.id; // Use params.id directly
        console.log("ID_PREGUNTA", id_pregunta);

        const responseUser = await getpregunta(id_pregunta);
        res.send(responseUser);

    }
    catch (e){

        handleHttp(res, "ERROR_GET_ITEM");

    }

};

const getItems = async (req: Request, res: Response) => {
    try {

        const responseUser = await getpreguntas();
        res.send({data: responseUser});
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsp = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getpreguntasp()
    res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const getItemsf = async (req: RequestExt, res: Response) => {
    try {

        const responseUser = await getpreguntasf()
        res.send(responseUser);
        

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

    }

};

const postItem = async({body, file}: Request, res: Response) => {
    try {

        console.log("BODY", body);
        console.log("FILE", file);

        const dataToRegister: IStorage = {
      fileName: `${file?.filename}`,
      path: `${file?.path}`,
    };

        const a = await insertPregunta(body, dataToRegister);
        console.log(body);
        console.log("Archivo subido:", file);
        console.log("path:", file?.path);
        console.log("filename:", file?.filename);
        res.send( a );

    }
    catch (e){
        handleHttp(res, "ERROR_CREATE_ITEM");

    }

};

const updateItem = ({body}: Request, res: Response) => {
    try {

        const id_pregunta = body.id_pregunta; 

       
        const response = updatepregunta(id_pregunta, body);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_UPDATE_ITEM");

    }

};

const deleteItem = ({body}: Request, res: Response) => {
    try {

        const response = deletepregunta(body.id_pregunta);
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_DELETE_ITEM");

    }

};

export { getItem, getItems, postItem, updateItem, deleteItem, getItemsp, getItemsf, };