import { Request, Response, Router } from "express";
import { getItem, getItems, getInfo, estadisticas, updateItem, infosinfo } from "../controller/usuario";
import { checkJWT } from "../middleware/session";
import { getCipherInfo } from "crypto";


const router = Router();    

router.get("/", checkJWT,getItems); // /item

router.get("/info",checkJWT, getInfo);

router.get("/info/sincifrado/:id", checkJWT, infosinfo); // /item/info/sincifrado

router.get("/estadisticas/:id", checkJWT, estadisticas); // /item/estadisticas

router.get("/:id", checkJWT, getItem); // /item/:id

router.put("/:id", checkJWT, updateItem);




export { router };  

