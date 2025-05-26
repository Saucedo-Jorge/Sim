import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controller/usuario";
import { logMiddleware } from "../middleware/log";
import { checkJWT } from "../middleware/session";


const router = Router();    

router.get("/",checkJWT, logMiddleware,getItems); // /item

router.get("/:id", getItem);

router.post("/",postItem);

router.put("/:id",updateItem);

router.delete("/:id",deleteItem);



export { router };  

