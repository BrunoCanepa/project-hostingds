const ServiceService = require('../services/serviceService');

async function getAllServices(req, res) {
    try {
        const services = await ServiceService.getAllServices();
        if (services.length > 0) {
            return res.status(200).json(services);
        } else {
            return res.status(204).json({ message: 'No hay Servicios' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener los Servicios', error: error.message });
    }
}

async function getUnpaidServices(req, res) {
    try {
        const services = await ServiceService.getUnpaidServices();
        if (services.length > 0) {
            return res.status(200).json(services);
        } else {
            return res.status(204).json({ message: 'No hay Servicios a pagar' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener los Servicios', error: error.message });
    }
}

async function getByIdService(req, res) {
    const serviceId = req.params.serviceId;

    try {
        const service = await ServiceService.getByIdService(serviceId);
        if (service) {
            return res.status(200).json(service);
        } else {
            return res.status(204).json({ message: 'No hay Servicios' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener el Servicio', error: error.message });
    }
}

async function createService(req, res) {
    console.log('controller');
    try {
        console.log('controller');
        const { name, price, startdate, enddate, paid, clientid, servicetypeid, payment, active, eliminated } = req.body;

        if (!name || !price || !startdate || !enddate || !clientid || !servicetypeid || !payment) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const newService = await ServiceService.createService({
            name, price, startdate, enddate, paid, clientid, servicetypeid, payment, active, eliminated
        });

        if (newService) {
            return res.status(201).json(newService);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el servicio', error: error.message });
    }
}

async function updateService(req, res) {
    const serviceId = req.params.serviceId;
    const data = req.body;

    try {
        const updatedService = await ServiceService.updateService(serviceId, data);
        if (updatedService) {
            return res.status(200).json(updatedService);
        } else {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error al actualizar el Servicio', error: error.message });
    }
}

async function getContactByService(req, res) {
    const serviceId = req.params.serviceId;

    try {
        const contacts = await ServiceService.getContactByService(serviceId);

        if (contacts && contacts.length > 0) {
            return res.status(200).json(contacts);
        } else {
            return res.status(404).json({ message: 'No se encontraron contactos para este servicio.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los contactos', error: error.message });
    }
}


module.exports = {
    getByIdService,
    getAllServices,
    createService,
    updateService,
    getContactByService,
    getUnpaidServices
};

