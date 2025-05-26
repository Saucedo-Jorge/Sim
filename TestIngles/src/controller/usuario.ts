import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getItem = (req: Request, res: Response) => {
    try {

    }
    catch (e){

        handleHttp(res, "ERROR_GET_ITEM");

    }

};

const getItems = (req: Request, res: Response) => {
    try {
        // Simulate fetching items
        const items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" }
        ];
        res.send(items);

    }
    catch (e){
        handleHttp(res, "ERROR_GET_ITEMS");

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

export { getItem, getItems, postItem, updateItem, deleteItem };