const { Router } = require('express');
const router = Router();


const ClientController = require('../controllers/clientController');

router.get('/contact/getById/:clientId', ClientController.getByIdClient);
router.get('/client/getAll', ClientController.getAllClients);
router.get('/client/getContacts/:clientId', ClientController.getContactByClient)
router.post('/client/create', ClientController.createClient);
router.put('/client/update/:clientId', ClientController.updateClient);

module.exports = router;