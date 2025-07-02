const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ContactModel extends Model { }

ContactModel.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        details: {
            type: DataTypes.STRING,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: 'Contact',
        tableName: 'contact',
    }
);

module.exports = ContactModel;