import { sign, verify } from 'jsonwebtoken';
import { Response } from 'express';
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = async (
  id_usuario: string,
  nombre: string,
  rol: string,
  res: Response // You can replace 'any' with the correct type, e.g., Response from Express
) => {
  const token = sign(
    { id_usuario, nombre, rol }, JWT_SECRET!, {
    expiresIn: '2h',
  });



  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true si usas HTTPS
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000, // 2 horas
  });

    res.json({ mensaje: 'Login exitoso' });
};
const verifyToken = (token: string): any => {
    const isOk = verify(token, JWT_SECRET!);
    return isOk;
};

export { generateToken, verifyToken };




