import { Model, DataTypes } from 'sequelize';
import { db } from '../config/database';


class HistorialNivelModel extends Model {
  id_historial!: number;
  id_usuario!: number | null;
  nivel!: 'basico' | 'intermedio' | 'avanzado' | null;
  motivo!: string | null;
  fecha!: Date | null;
}

HistorialNivelModel.init({
  id_historial: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },

  nivel: {
    type: DataTypes.ENUM('basico', 'intermedio', 'avanzado'),
    allowNull: true,
    defaultValue: null
  },

  motivo: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },

  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }

}, {
  sequelize: db,
  modelName: 'historial_niveles',
  tableName: 'historial_niveles',
  timestamps: false
});

export { HistorialNivelModel };
