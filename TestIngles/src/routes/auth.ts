import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl, logoutCtrl } from "../controller/auth";


const router = Router();    

router.post("/register", registerCtrl); // /item

router.post("/login", loginCtrl);

router.post("/logout", logoutCtrl); // Uncomment if you have a logout controller

export { router };  


