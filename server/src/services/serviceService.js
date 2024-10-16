const { or } = require('sequelize');
const { ContactModel, ClientModel, ServiceModel, ServiceTypeModel } = require('../associations.js')
const { Op } = require('sequelize');
const moment = require('moment');

// Servicio para crear un servicio
async function createService(data) {
    console.log('service');
    try {
        console.log('service');
        const { name, price, startdate, enddate, paid, clientid, servicetypeid, payment, active, eliminated } = data;

        // Crea el servicio en la base de datos utilizando el modelo
        const newService = await ServiceModel.create({
            name, price, startdate, enddate, paid, clientid, servicetypeid, payment, active, eliminated
        });

        return newService;
    } catch (error) {
        throw error;
    }
}

// Servicio para obtener un servicio por su id
async function getByIdService(serviceId) {
    try {
        const getService = await ServiceModel.findByPk(serviceId);

        return getService;
    } catch (error) {
        throw new Error('Error al obtener el servicio con id ' + serviceId + ' desde la base de datos');
    }
}

// Servicio para obtener todos los servicios
async function getAllServices() {
    try {
        const allServices = await ServiceModel.findAll({
            order: [['enddate', 'ASC']], // Ordena por la columna 'endDate' de manera ascendente (de menor a mayor)
            include: [
                {
                    model: ClientModel,
                    required: true,
                    attributes: ['name', 'rut', 'companyname', 'details', 'adress'],
                },
                {
                    model: ServiceTypeModel,
                    required: true,
                    attributes: ['name', 'type'],
                }
            ]
        });
        return allServices;
    } catch (error) {
        throw new Error('Error al obtener todos los servicios desde la base de datos');
    }
}


async function getUnpaidServices() {
    try {
        const fortyFiveDaysLater = moment().add(45, 'days').startOf('day').toDate(); // Fecha 45 días después

        const unpaidServices = await ServiceModel.findAll({
            where: {
                paid: false,
                eliminated: false,
                enddate: {
                    [Op.lt]: fortyFiveDaysLater, // enddate es menor a 45 días desde hoy
                }
            },
            order: [['enddate', 'ASC']],
            include: [
                {
                    model: ClientModel,
                    required: true,
                    attributes: ['name', 'rut', 'companyname', 'details', 'adress'],
                },
                {
                    model: ServiceTypeModel,
                    required: true,
                    attributes: ['name', 'type'],
                }
            ]
        });
        return unpaidServices;
    } catch (error) {
        throw new Error('Error al obtener los servicios impagos y vencidos o próximos a vencer desde la base de datos');
    }
}


// Servicio para actualizar un servicio
async function updateService(serviceId, data) {
    try {
        // Busca el servicio por su ID
        const service = await ServiceModel.findByPk(serviceId);

        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        // Actualiza los campos del servicio con los datos proporcionados
        const updatedService = await service.update(data);

        return updatedService;
    } catch (error) {
        throw new Error('Error al actualizar el servicio con id ' + serviceId);
    }
}

async function getContactByService(serviceId) {
    const service = await ServiceModel.findByPk(serviceId, {
        include: {
            model: ClientModel,
            include: ContactModel,
        },
    });

    if (service) {
        const client = service.Client;
        const contacts = client ? client.Contacts : [];
        return contacts; // Esto te da una lista de contactos del cliente de este servicio
    }

    return null;
}




module.exports = {
    createService,
    getByIdService,
    getAllServices,
    updateService,
    getContactByService,
    getUnpaidServices
};


