const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ClientModel extends Model { }

ClientModel.init(
  {
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
    modelName: 'Client',
    tableName: 'client',
  }
);

module.exports = ClientModel;




