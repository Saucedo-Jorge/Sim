import { hash, compare } from "bcryptjs";
import e from "express";

const encrypt = async (contrasena:string) => {
    const passwordHash = await hash(contrasena, 10);
    return passwordHash;
};

const verified = async (contrasena: string, passHash : string) => {
    const isValid = await compare(contrasena, passHash);
    return isValid;
};


export { encrypt, verified };
