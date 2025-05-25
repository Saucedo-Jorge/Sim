import { Model, DataTypes } from 'sequelize';
import { User } from '../interface/user.interface';
import { db } from '../config/database';

class UserModel extends Model<User> implements User {
  id_usuario!: number;
  nombre!: string;
  apellidop!: string;  
  apellidom!: string;
  correo!: string;
  contrasena!: string;  
  nivel_actual!: 'basico' | 'intermedio' | 'avanzado';
  intentos_examen_final!: number;
  createdAt!: Date;
  updatedAt!: Date;
  intentos_examen_prueba!: number;

}


  
  UserModel.init({

    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellidop: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    apellidom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    
    nivel_actual: {
      type: DataTypes.STRING,
      defaultValue: 'basico',
        allowNull: false,
    },
        
    intentos_examen_final: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
        },



    
    intentos_examen_prueba: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      allowNull: false,
    },

  }, {
    sequelize: db, // Assuming sequelize is defined elsewhere
    modelName: 'usuarios',
    timestamps: true,
  });

  export { UserModel };