const { Router } = require('express');
const router = Router();


const ServiceController = require('../controllers/serviceController');


router.get('/service/getById/:serviceId', ServiceController.getByIdService);
router.get('/service/getAll', ServiceController.getAllServices);
router.get('/service/getUnpaid', ServiceController.getUnpaidServices);
router.post('/service/create', ServiceController.createService);
router.put('/service/update/:serviceId', ServiceController.updateService);
router.get('/service/getContacts/:serviceId', ServiceController.getContactByService);


module.exports = router;