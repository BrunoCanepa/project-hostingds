const { Router } = require('express');
const router = Router();


const ServiceTypeController = require('../controllers/serviceTypeController');


router.get('/serviceType/getAll', ServiceTypeController.getAllServiceType);
router.post('/serviceType/create', ServiceTypeController.createServiceType);


module.exports = router;