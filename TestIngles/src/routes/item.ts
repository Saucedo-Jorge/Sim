import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controller/usuario";
import { logMiddleware } from "../middleware/log";


const router = Router();    

router.get("/",logMiddleware); // /item

router.get("/:id", getItem);

router.post("/",postItem);

router.put("/:id",updateItem);

router.delete("/:id",deleteItem);



export { router };  

