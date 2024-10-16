const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database.js');

class ContactModel extends Model { }

ContactModel.init(
    {
        // Atributos de cliente (el id lo genera Postgres)
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
        modelName: 'Contact', // Nombre del modelo
        tableName: 'contact', // Nombre de la tabla en la base de datos
    }
);

module.exports = ContactModel;