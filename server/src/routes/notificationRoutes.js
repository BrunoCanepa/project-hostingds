const { Router } = require('express');
const router = Router();


const NotificationController = require('../controllers/notificationController');

router.post('/send/email', NotificationController.sendEmail);
router.post('/send/message', NotificationController.sendMessage);


module.exports = router;
