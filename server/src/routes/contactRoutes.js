const { Router } = require('express');
const router = Router();


const ContactController = require('../controllers/contactController');

// Ruta para obtener un contacto por su ID
router.get('/contact/getById/:contactId', ContactController.getByIdContact);

// Ruta para mostrar todos los contactos
router.get('/contact/getAll', ContactController.getAllContacts);

// Ruta para crear un contacto
router.post('/contact/create', ContactController.createContact);

// Ruta para actualizar un contacto
router.put('/contact/update/:contactId', ContactController.updateContact);


module.exports = router;