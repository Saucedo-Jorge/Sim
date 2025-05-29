import { Model, DataTypes } from 'sequelize';
import { db } from '../config/database';


class ExamenModel extends Model {
  id_examen!: number;
  id_usuario!: number | null;
  tipo_examen!: 'prueba' | 'final' | null;
  fecha_inicio!: Date | null;
  calificacion!: number | null;
}

ExamenModel.init({
  id_examen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },

  tipo_examen: {
    type: DataTypes.ENUM('prueba', 'final'),
    allowNull: true,
    defaultValue: null
  },

  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },

  calificacion: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: null
  }

}, {
  sequelize: db,
  modelName: 'examenes',
  timestamps: false
});

export { ExamenModel };
