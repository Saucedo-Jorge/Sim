import { Request, Response, NextFunction } from "express";
import { verified } from "../utils/bcrypt.handle";
import { verifyToken } from "../utils/jwt.handle";
import { RequestExt } from "../interface/requestExt.interface";


const checkJWT = (req: RequestExt, res: Response, next:NextFunction) => {

        console.log("Checking JWT...");
        console.log("Cookies:", req.cookies);
        console.log("Headers:", req.headers);
        console.log("Cookies token:", req.cookies.token);
        console.log("Headers authorization:", req.headers.authorization);

        const jwtByUser = req.cookies.token || req.headers.authorization || null;
        if (!jwtByUser) {
            res.status(401).send({ error: "No token provided" });
        }
        else{

            const jwt = jwtByUser.split(" ").pop();
        const isOk = verifyToken(`${jwt}` );

        console.log("user:", isOk);
        if (!isOk) {
            res.status(401).send({ error: "Invalid token" });
        }
        else {


            req.user = isOk; // Attach the user information to the request object

            console.log("JWT by user:", isOk);
            next();
        }

        }
        

};

export { checkJWT };