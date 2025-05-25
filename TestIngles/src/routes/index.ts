import { Console } from "console";
import { Router } from "express"; // IMPORTAMOS
import { readdirSync } from "fs";


const PATH_ROUTER=`${__dirname}`;
const router = Router(); // CREAMOS

const cleanFileName = (fileName: string) => {
    return fileName.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") {
    
        import(`./${cleanName}`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router); // USAMOS EL ROUTER
        });
        
    }

}); 




export { router };   // EXPORTAMOS