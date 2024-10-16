const { Router } = require('express');
const router = Router();


const ServiceController = require('../controllers/serviceController');

// Ruta para obtener un servicio por su ID
router.get('/service/getById/:serviceId', ServiceController.getByIdService);

// Ruta para mostrar todos los servicios
router.get('/service/getAll', ServiceController.getAllServices);

//Ruta para mostrar los servicios a pagar
router.get('/service/getUnpaid', ServiceController.getUnpaidServices);

// Ruta para crear un servicio
router.post('/service/create', ServiceController.createService);

//Ruta para actualizar un servicio
router.put('/service/update/:serviceId', ServiceController.updateService);

// Ruta para obtener los contactos de un servicio
router.get('/service/getContacts/:serviceId', ServiceController.getContactByService);


module.exports = router;