const ServiceTypeService = require('../services/serviceTypeService');

// Controlador para obtener todos los ServiceType
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


// Controlador para obtener un ServiceType por su ID
/*async function getByIdServiceType(req, res) {
    const serviceTypeId = req.params.serviceTypeId;

    try {
        const serviceType = await ServiceTypeService.getByIdServiceType(serviceTypeId);
        if (serviceType) {
            return res.status(200).json(serviceType);
        } else {
            return res.status(204).json({ message: 'No hay ServiceType' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener el ServiceType', error: error.message });
    }
}*/

// Controlador para crear un ServiceType
async function createServiceType(req, res) {
    try {

        const { name, type } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        // Llama al servicio para crear el ServiceType
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
    //getByIdServiceType,
    getAllServiceType,
    createServiceType,
};