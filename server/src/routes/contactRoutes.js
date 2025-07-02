const { Router } = require('express');
const router = Router();


const ContactController = require('../controllers/contactController');


router.get('/contact/getById/:contactId', ContactController.getByIdContact);
router.get('/contact/getAll', ContactController.getAllContacts);
router.post('/contact/create', ContactController.createContact);
router.put('/contact/update/:contactId', ContactController.updateContact);


module.exports = router;