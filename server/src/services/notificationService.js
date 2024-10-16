const nodemailer = require('nodemailer');
const axios = require('axios');

//Servicio para enviar notificacion por WhatsApp 
async function sendMessageService(data) {

    const { recipientNumber, clientName, serviceType, template } = data;
    const url = `https://graph.facebook.com/v20.0/128902603646480/messages`;
    const token = 'EAAEuoT3df4EBOZBtuGg1iaTrrBtj4IWdrEex04OKTeRZC3f4cD2nP8YnjsBu8vZAZCZABlDHxTNszfkRt6mCrPGZCQUFa9RNKZCHJlSXjs6tIZAyIbXK7zdzPmlMCw5ZAzL7mgJRRi9UkZCzE18XbtMSK1ZAvokyZC22KtsIqxZBYGRDnduOPDJKth8cZAuULHMTCZCbVC8wwZDZD'; // Tu token de acceso

    const messageData = {
        messaging_product: 'whatsapp',
        to: `${recipientNumber}`,
        type: 'template',
        template: {
            name: template,
            language: {
                code: 'es',
            },
            components: [
                {
                    type: 'body',
                    parameters: [
                        { type: 'text', text: `${clientName}` },
                        { type: 'text', text: `${serviceType}` },
                    ],
                },
            ],
        },
    };

    console.log(messageData)
    try {
        const response = await axios.post(url, messageData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Mensaje enviado:', response.data);
        return ('Mensaje enviado:', response.data);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error.response.data);
        return ('Error al enviar el mensaje:', error.response.data)
    }
};

//Servicio para enviar Emails
async function sendEmailService(data) {

    const { clientEmail, body, subject } = data;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebasDevBC@gmail.com',
            pass: 'ibry nfdv cdnv rjju',
        },
    });

    const mailOptions = {
        from: 'pruebasDevBC@gmail.com',
        to: clientEmail,
        subject: subject,
        text: body,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
        return ('Correo enviado: ' + info.response);
    } catch (error) {
        console.log(error);
        return ("Error al enviar el Mail", error);
    }

}

/*
try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
        return 'Correo enviado: ' + info.response;
    } catch (error) {
        console.log(error);
        throw error;  // Lanzar el error si necesitas que sea manejado por un bloque catch superior
    }
         */

module.exports = {
    sendEmailService,
    sendMessageService,
};