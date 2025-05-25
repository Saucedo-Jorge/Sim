import { Response } from "express";

const handleHttp = (res:Response, error: string, errorRaw?:any) => {
    console.log(errorRaw); // Log the raw error for debugging purposes
    res.status(500);
    res.send({ error });

}
export { handleHttp };