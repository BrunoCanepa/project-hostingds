const { or } = require('sequelize');
const { ContactModel } = require('../associations');

// Servicio para crear un contacto
async function createContact(data) {
    try {
        const { name, phone, email, details, clientid } = data;

        // Crea el contacto en la base de datos utilizando el modelo
        const newContact = await ContactModel.create({
            name, phone, email, details, clientid

        });
        return newContact;
    } catch (error) {
        throw error;
    }
}

// Servicio para actualizar un contacto
async function updateContact(contactId, data) {
    try {
        // Busca el contacto por su ID
        const contact = await ContactModel.findByPk(contactId);

        if (!contact) {
            throw new Error('Contacto no encontrado');
        }

        // Actualiza los campos del contacto con los datos proporcionados
        const updatedContact = await contact.update(data);

        return updatedContact;
    } catch (error) {
        throw new Error('Error al actualizar el contacto con id ' + contactId);
    }
}

// Servicio para obtener un contacto por su id
async function getByIdContact(contactId) {
    try {
        const getContact = await ContactModel.findByPk(contactId);

        return getContact;
    } catch (error) {
        throw new Error('Error al obtener el contacto con id ' + contactId + ' desde la base de datos');
    }
}

// Servicio para obtener todos los contactos
async function getAllContacts() {
    try {
        const allContacts = await ContactModel.findAll({
            order: [['name', 'ASC']], // Ordena por la columna 'id' de manera ascendente (de menor a mayor)
        });
        return allContacts;
    } catch (error) {
        throw new Error('Error al obtener todos los contactos desde la base de datos');
    }
}


module.exports = {
    createContact,
    getByIdContact,
    getAllContacts,
    updateContact
};