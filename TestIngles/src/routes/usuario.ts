import { Request, Response, Router } from "express";
import { getItem, getItems } from "../controller/usuario";
import { checkJWT } from "../middleware/session";


const router = Router();    

router.get("/", checkJWT,getItems); // /item

router.get("/:id", checkJWT, getItem); // /item/:id



export { router };  

