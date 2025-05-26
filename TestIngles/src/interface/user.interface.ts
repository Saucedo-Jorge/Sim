import { IAuth } from "./auth.interface";

export interface User extends IAuth {
    id_usuario: number;
    nombre: string;
    apellidop: string;
    apellidom: string;
    rol: 'A' | 'U'; // A: Admin, U: Usuario
    nivel_actual: 'basico' | 'intermedio' | 'avanzado';
    intentos_examen_prueba: number;
    intentos_examen_final: number;
    createdAt?: Date;
    updatedAt?: Date;
}