const ContactService = require('../services/contactService');

async function getAllContacts(req, res) {
    try {
        const contacts = await ContactService.getAllContacts();
        if (contacts.length > 0) {
            return res.status(200).json(contacts);
        } else {
            return res.status(204).json({ message: 'No hay Contactos' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener los Contactos', error: error.message });
    }
}

async function getByIdContact(req, res) {
    const contactId = req.params.contactId;

    try {
        const contact = await ContactService.getByIdContact(contactId);
        if (contact) {
            return res.status(200).json(contact);
        } else {
            return res.status(204).json({ message: 'No hay Contactos' });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error al obtener el Contacto', error: error.message });
    }
}

async function createContact(req, res) {
    try {

        const { name, phone, email, details, clientid } = req.body;

        if (!name || !phone || !email || !clientid) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' });
        }

        const newContact = await ContactService.createContact({
            name, phone, email, details, clientid
        });

        if (newContact) {
            return res.status(201).json(newContact);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el contacto', error: error.message });
    }
}

async function updateContact(req, res) {
    const contactId = req.params.contactId;
    const data = req.body;

    try {
        const updatedContact = await ContactService.updateContact(contactId, data);
        if (updatedContact) {
            return res.status(200).json(updatedContact);
        } else {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error al actualizar el contacto', error: error.message });
    }
}

module.exports = {
    getByIdContact,
    getAllContacts,
    createContact,
    updateContact
};