const { Router } = require('express');
const router = Router();


const ServiceTypeController = require('../controllers/serviceTypeController');

// Ruta para obtener un serviceType por su ID
//router.get('/serviceType/getById/:serviceTypeId', serviceTypeController.getByIdServiceType);

// Ruta para mostrar todos los serviceType
router.get('/serviceType/getAll', ServiceTypeController.getAllServiceType);

// Ruta para crear un serviceType
router.post('/serviceType/create', ServiceTypeController.createServiceType);


module.exports = router;