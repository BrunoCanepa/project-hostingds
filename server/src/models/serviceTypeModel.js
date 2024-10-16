const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ServiceTypeModel extends Model { }

ServiceTypeModel.init(
    {
        // Atributos de ServiceType (el id lo genera Postgres)
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: 'ServiceType', // Nombre del modelo
        tableName: 'serviceType', // Nombre de la tabla en la base de datos
    }
);

module.exports = ServiceTypeModel;