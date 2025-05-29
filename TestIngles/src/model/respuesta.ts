import { Model, DataTypes } from 'sequelize';
import { db } from '../config/database';



class RespuestaModel extends Model {
  id_respuesta!: number;
  id_examen!: number | null;
  id_pregunta!: number | null;
  respuesta_usuario!: 'a' | 'b' | 'c' | 'd' | null;
  es_correcta!: boolean | null;
}

RespuestaModel.init({
  id_respuesta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  id_examen: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },

  id_pregunta: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },

  respuesta_usuario: {
    type: DataTypes.ENUM('a', 'b', 'c', 'd'),
    allowNull: true,
    defaultValue: null
  },

  es_correcta: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },

}, {
  sequelize: db,
  modelName: 'respuestas',
  timestamps: false
});

export { RespuestaModel };
