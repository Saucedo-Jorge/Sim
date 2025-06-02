import { Request, Response, Router } from "express";
import { getItem, getItems, getInfo } from "../controller/usuario";
import { checkJWT } from "../middleware/session";
import { getCipherInfo } from "crypto";


const router = Router();    

router.get("/", checkJWT,getItems); // /item

router.get("/info",checkJWT, getInfo);

router.get("/:id", checkJWT, getItem); // /item/:id




export { router };  

