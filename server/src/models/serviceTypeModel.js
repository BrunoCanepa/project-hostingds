const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ServiceTypeModel extends Model { }

ServiceTypeModel.init(
    {
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
        modelName: 'ServiceType',
        tableName: 'serviceType',
    }
);

module.exports = ServiceTypeModel;