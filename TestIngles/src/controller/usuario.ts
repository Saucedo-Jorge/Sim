import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { RequestExt } from "../interface/requestExt.interface";
import { getusuario, getusuarios, insertUsuario } from "../service/usuario";
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

const getInfo = async (req: RequestExt, res: Response) => {
    try {
      
        console.log("Info del usuario");
        console.log("USER", req.user);
        res.send({data : req.user});

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

const updateItem = (req: Request, res: Response) => {
    try {

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

export { getItem, getItems, postItem, updateItem, deleteItem, getInfo };