const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ServiceModel extends Model { }

ServiceModel.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        startdate: {
            type: DataTypes.DATE,
        },
        enddate: {
            type: DataTypes.DATE,
        },
        paid: {
            type: DataTypes.BOOLEAN,
        },
        payment: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        eliminated: {
            type: DataTypes.BOOLEAN,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'service',
    }
);

module.exports = ServiceModel;

