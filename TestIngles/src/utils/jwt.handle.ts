import { sign, verify } from 'jsonwebtoken';
import { Response } from 'express';
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = async (
  id_usuario: string,
  nombre: string,
  rol: string,
  intentos_examen_final: number,
  intentos_examen_prueba: number,
  res: Response // You can replace 'any' with the correct type, e.g., Response from Express
) => {
  const token = sign(
    { id_usuario, nombre, rol, intentos_examen_final, intentos_examen_prueba }, JWT_SECRET!, {
    expiresIn: '5h',
  });



  console.log("Token generado:", token);
  res.cookie('token', token, {
    httpOnly: false,
    secure: false, // true si usas HTTPS
    maxAge: 5 * 60 * 60 * 1000, // 2 horas
  });

    return token;

};
const verifyToken = (token: string): any => {
    const isOk = verify(token, JWT_SECRET!);
    return isOk;
};

export { generateToken, verifyToken };




