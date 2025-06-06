import { Request, Response, Router } from "express";
import { history, deleteItem, getItem, getItems, getItemsf, getItemsp, postItem, updateItem } from "../controller/respuesta";
import { checkJWT } from "../middleware/session";


const router = Router();    

router.get("/",checkJWT, getItems); 

router.get("/prueba",checkJWT, getItemsp); 

router.get("/final",checkJWT, getItemsf); 

router.get("/history/:id",checkJWT, history);

router.get("/:id",checkJWT,  getItem);

router.post("/",checkJWT, postItem);

router.put("/:id",checkJWT, updateItem);

router.delete("/:id",checkJWT, deleteItem);



export { router };  