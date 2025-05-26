import { Request, Response, NextFunction } from "express";
import { verified } from "../utils/bcrypt.handle";
import { verifyToken } from "../utils/jwt.handle";


const checkJWT = (req: Request, res: Response, next:NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization ||null;
        const jwt = jwtByUser?.split(" ").pop() || null;
        const isOk = verifyToken(`${jwt}` );
        console.log("JWT by user:", isOk);
        if (!isOk) {
            res.status(401).send({ error: "Invalid token" });
        }
        else {
            
            console.log("JWT by user:", jwtByUser);
            next();
        }
    }
    catch (e) {
        console.error("Error in checkJWT middleware:", e);
        res.status(403).send({ error: "Invalid token" });
    }
};

export { checkJWT };