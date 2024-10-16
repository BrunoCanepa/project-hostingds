const nodemailer = require('nodemailer');
const axios = require('axios');
const { getAllServices, updateService, getContactByService } = require('./services/serviceService.js');

async function sendMessage(recipientNumber, clientName, daysToPay, serviceType, endDate) {

    const url = `https://graph.facebook.com/v20.0/128902603646480/messages`;
    const token = 'EAAEuoT3df4EBOZBtuGg1iaTrrBtj4IWdrEex04OKTeRZC3f4cD2nP8YnjsBu8vZAZCZABlDHxTNszfkRt6mCrPGZCQUFa9RNKZCHJlSXjs6tIZAyIbXK7zdzPmlMCw5ZAzL7mgJRRi9UkZCzE18XbtMSK1ZAvokyZC22KtsIqxZBYGRDnduOPDJKth8cZAuULHMTCZCbVC8wwZDZD'; // Tu token de acceso

    const messageData = {
        messaging_product: 'whatsapp',
        to: `${recipientNumber}`,
        type: 'template',
        template: {
            name: 'payment_recordatory',
            language: {
                code: 'es',
            },
            components: [
                {
                    type: 'body',
                    parameters: [
                        { type: 'text', text: `${clientName}` },
                        { type: 'text', text: `${daysToPay}` },
                        { type: 'text', text: `${serviceType}` },
                        { type: 'text', text: `${endDate}` },
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
    } catch (error) {
        console.error('Error al enviar el mensaje:', error.response.data);
    }
};

async function sendEmail(clientEmail, clientName, daysToPay, serviceType, endDate, mailType, serviceName) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebasDevBC@gmail.com',
            pass: 'ibry nfdv cdnv rjju',
        },
    });
    if (mailType == 1) {
        const mailOptions = {
            from: 'pruebasDevBC@gmail.com',
            to: clientEmail,
            subject: 'Recordatorio de pago',
            text: `Hola ${clientName}!, dentro de ${daysToPay} dias su servicio de ${serviceType} se vencerá. Por favor abonar su servicio antes del ${endDate}. Muchas gracias!`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo enviado: ' + info.response);
        });
    } else if (mailType == 2) {
        const mailOptions = {
            from: 'pruebasDevBC@gmail.com',
            to: 'brunocanepa22@gmail.com',
            subject: 'Recordatorio de pago',
            text: `Hola Mauricio! El servicio ${serviceName} de ${serviceType} del cliente ${clientName} se venció. Por favor suspender su servicio.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Correo enviado: ' + info.response);
        });
    }



}

function addOneYear(dateString) {
    const date = new Date(dateString);
    console.log(date);
    console.log(dateString);
    // Agregar un año a la fecha
    date.setFullYear(date.getFullYear() + 1);
    console.log(date);

    return date;
}

async function notify() {
    const services = await getAllServices();
    const fechaActual = new Date();

    const results = await Promise.all(services.map(async (service) => {
        if (!service.eliminated) {
            const contacts = await getContactByService(service.id);
            const fechaObjetivo = new Date(service.enddate);
            const diferenciaEnTiempo = fechaObjetivo - fechaActual;
            const diferenciaEnDias = Math.ceil(diferenciaEnTiempo / (1000 * 60 * 60 * 24));
            console.log(diferenciaEnDias);
            if (service.active && !service.paid && service.payment == 'Anual') {
                if (diferenciaEnDias == 30 || diferenciaEnDias == 15 || diferenciaEnDias == 7 || diferenciaEnDias == 3 || diferenciaEnDias == 2 || diferenciaEnDias == 1) {
                    contacts.map((contact) => {
                        sendMessage(contact.phone, contact.name, diferenciaEnDias, service.ServiceType.name, service.enddate);
                        sendEmail(contact.email, contact.name, diferenciaEnDias, service.ServiceType.name, service.enddate, 1);
                    })
                }
                if (diferenciaEnDias == 0) {
                    sendEmail(service.Client.name, service.Client.name, diferenciaEnDias, service.ServiceType.name, service.enddate, 2, service.name);
                }
            }
            if (service.active && service.paid && service.payment == 'Anual') {
                if (diferenciaEnDias <= -30) {
                    console.log(diferenciaEnDias)
                    const newEndDate = addOneYear(service.enddate);
                    updateService(service.id, {
                        "enddate": newEndDate,
                        "paid": false
                    })
                }
            }
        }
    }));


}

module.exports = {
    notify
};