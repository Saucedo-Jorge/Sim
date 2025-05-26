import { sign, verify } from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = async (id_usuario:string, nombre:string, rol:string) => {
    const jwt = sign(
        { id_usuario, nombre, rol },JWT_SECRET!, {
        expiresIn: '2h',
    });
    return jwt; 
};

const verifyToken = (token: string): any => {
    const isOk = verify(token, JWT_SECRET!);
    return isOk;
};

export { generateToken, verifyToken };