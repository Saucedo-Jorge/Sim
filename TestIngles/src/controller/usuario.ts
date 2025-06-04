import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interface/requestExt.interface";
import { getusuario, getusuarios, insertUsuario, estuser, updateusuario, infouser } from "../service/usuario";
import { userInfo } from "os";

const getItem = async ({params}: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await getusuario(parseInt(id,10));
        res.send(response);
        }
    catch (e){

        handleHttp(res, "ERROR_GET_USUARIO");

    }

};

const getItems = async (req: Request, res: Response) => {
    try {
        const response = await getusuarios();
        res.send(response);

    }
    catch (e){
        handleHttp(res, "ERROR_GET_USUARIOS",e);

    }

};

const estadisticas = async ({params}: Request, res: Response) => {
    try {

        const est = await estuser(parseInt(params.id,10));
        res.send(est);
    }
    catch (e){
        handleHttp(res, "ERROR_GET_ESTADISTICAS",e);

    }
}

const getInfo = async (req: RequestExt, res: Response) => {
    try {
      
        res.send( req.user);

    }
    catch (e){
        handleHttp(res, "ERROR_GET_INFO",e);

    }

};


const infosinfo = async ({params}: Request, res: Response) => {
    try {
      
        const info = await infouser(parseInt(params.id,10));
        res.send(info);

    }
    catch (e){
        handleHttp(res, "ERROR_GET_INFO",e);

    }

};


const postItem = ({body}: Request, res: Response) => {
    try {
        console.log(body);
        res.send( body );

    }
    catch (e){
        handleHttp(res, "ERROR_CREATE_ITEM");

    }

};

const updateItem = async ({body, params}: Request, res: Response) => {
    try {
        console.log("BODY", body);
        console.log("PARAMS", params.id);
        const est = await updateusuario(parseInt(params.id,10), body);
        res.send(est);
    }
    catch (e){
        handleHttp(res, "ERROR_UPDATE_ITEM");

    }

};

const deleteItem = (req: Request, res: Response) => {
    try {

    }
    catch (e){
        handleHttp(res, "ERROR_DELETE_ITEM");

    }

};

export { getItem, getItems, postItem, updateItem, deleteItem, getInfo, estadisticas, infosinfo };