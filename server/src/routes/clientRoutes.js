const { Router } = require('express');
const router = Router();


const ClientController = require('../controllers/clientController');

// Ruta para obtener un cliente por su ID
router.get('/contact/getById/:clientId', ClientController.getByIdClient);

// Ruta para mostrar todos los clientes
router.get('/client/getAll', ClientController.getAllClients);

// Ruta para mostrar los contactos de un cliente
router.get('/client/getContacts/:clientId', ClientController.getContactByClient)

// Ruta para crear un cliente
router.post('/client/create', ClientController.createClient);

// Ruta para actualizar un cliente
router.put('/client/update/:clientId', ClientController.updateClient);

module.exports = router;