const notificationService = require('../services/notificationService');

async function sendMessage(req, res) {
    try {
        const { recipientNumber, clientName, serviceType, template } = req.body;
        if (!recipientNumber || !clientName || !serviceType || !template) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const newMessage = await notificationService.sendMessageService({
            recipientNumber, clientName, serviceType, template
        })

        if (newMessage) {
            return res.status(201).json(newMessage);
        }

    } catch (error) {
        res.status(400).json({ error: 'Error al Enviar el mensaje', error: error.message })
    }

}

async function sendEmail(req, res) {
    try {
        const { clientEmail, body, subject } = req.body;
        if (!clientEmail || !body || !subject) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const newEmail = await notificationService.sendEmailService({
            clientEmail, body, subject
        })

        if (newEmail) {
            return res.status(201).json(newEmail);
        }

    } catch (error) {
        res.status(400).json({ error: 'Error al Enviar el mail', error: error.message })
    }

}

module.exports = {
    sendEmail,
    sendMessage,
};