const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ClientModel extends Model { }

ClientModel.init(
  {
    // Atributos de cliente (el id lo genera Postgres)
    name: {
      type: DataTypes.STRING,
    },
    rut: {
      type: DataTypes.STRING,
    },
    companyname: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'Client', // Nombre del modelo
    tableName: 'client', // Nombre de la tabla en la base de datos
  }
);

module.exports = ClientModel;




/*•	Razón social
•	Rut
•	Direccion
•	Detalles “Descripcion” -Opcional
•	Contacto
*/