const ServiceTypeService = require('../services/serviceTypeService');

async function getAllServiceType(req, res) {
    try {
        const serviceType = await ServiceTypeService.getAllServiceType();
        if (serviceType.length > 0) {
            return res.status(200).json(serviceType);
        } else {
            return res.status(204).json({ message: 'No hay ServiceType' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener los ServiceType', error: error.message });
    }
}

async function createServiceType(req, res) {
    try {

        const { name, type } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const newServiceType = await ServiceTypeService.createServiceType({
            name, type
        });

        if (newServiceType) {
            return res.status(201).json(newServiceType);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el ServiceType', error: error.message });
    }
}

module.exports = {
    getAllServiceType,
    createServiceType,
};