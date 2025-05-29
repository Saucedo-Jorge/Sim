import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems, getItemsf, getItemsp, postItem, updateItem ,} from "../controller/pregunta";
import { checkJWT } from "../middleware/session";
import multerMiddleware from "../middleware/file";


const router = Router();    

router.get("/",checkJWT, getItems); 

router.get("/prueba",checkJWT, getItemsp); 

router.get("/final",checkJWT, getItemsf); 

router.get("/:id",checkJWT,  getItem);

router.post("/", checkJWT, multerMiddleware.single("myfile"), postItem);

router.put("/:id",checkJWT, updateItem);

router.delete("/:id",checkJWT, deleteItem);


export { router };  