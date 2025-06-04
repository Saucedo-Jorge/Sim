import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems,  postItem, updateItem } from "../controller/examen";
import { checkJWT } from "../middleware/session";


const router = Router();    

router.get("/",checkJWT, getItems); 

router.get("/:id",checkJWT,  getItem);

router.post("/",checkJWT, postItem);

router.put("/:id",checkJWT, updateItem);

router.delete("/:id",checkJWT, deleteItem);



export { router };  