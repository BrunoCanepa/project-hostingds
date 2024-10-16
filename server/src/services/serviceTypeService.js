const { or } = require('sequelize');
const { ServiceTypeModel } = require('../associations');

// Servicio para crear un ServiceType
async function createServiceType(data) {
    try {
        const { name, type } = data;

        // Crea el ServiceType en la base de datos utilizando el modelo
        const newServiceType = await ServiceTypeModel.create({
            name, type
        });

        return newServiceType;
    } catch (error) {
        throw error;
    }
}

// Servicio para obtener un ServiceType por su id
async function getByIdServiceType(serviceTypeId) {
    try {
        const getServiceType = await ServiceTypeModel.findByPk(serviceTypeId);

        return getServiceType;
    } catch (error) {
        throw new Error('Error al obtener el ServiceType con id ' + serviceTypeId + ' desde la base de datos');
    }
}

// Servicio para obtener todos los ServiceType
async function getAllServiceType() {
    try {
        const allServiceType = await ServiceTypeModel.findAll({
            order: [['name', 'ASC']], // Ordena por la columna 'id' de manera ascendente (de menor a mayor)
        });
        return allServiceType;
    } catch (error) {
        console.log('Error al obtener todos los ServiceType desde la base de datos');
        throw new Error('Error al obtener todos los ServiceType desde la base de datos');
    }
}


module.exports = {
    createServiceType,
    getByIdServiceType,
    getAllServiceType,
};