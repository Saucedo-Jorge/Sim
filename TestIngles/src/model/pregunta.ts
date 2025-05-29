import { Model, DataTypes } from 'sequelize';
import { db } from '../config/database';

class PreguntaModel extends Model {
  id_pregunta!: number;
  enunciado!: string | null;
  path!: string | null; 
  filename!: string | null;
  opcion_a!: string | null;
  opcion_b!: string | null;
  opcion_c!: string | null;
  opcion_d!: string | null;
  respuesta_correcta!: 'a' | 'b' | 'c' | 'd' | null;
    createdAt!: Date;
    updatedAt!: Date;
}

PreguntaModel.init({
  id_pregunta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },


  enunciado: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },

  path: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  filename: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  opcion_a: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  opcion_b: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  opcion_c: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  opcion_d: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },

  respuesta_correcta: {
    type: DataTypes.ENUM('a', 'b', 'c', 'd'),
    allowNull: true,
    defaultValue: null
  },

  createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
        },

}, {
  sequelize: db,
  modelName: 'preguntas',
  timestamps: true 
});

export { PreguntaModel };
