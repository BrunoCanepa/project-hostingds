const { or } = require('sequelize');
const { ClientModel, ContactModel } = require('../associations');


// Servicio para crear un cliente
async function createClient(data) {
  try {
    const { name, rut, companyname, details, adress } = data;

    // Crea el cliente en la base de datos utilizando el modelo
    const newClient = await ClientModel.create({
      name, rut, companyname, details, adress
    });

    return newClient;
  } catch (error) {
    throw error;
  }
}

// Servicio para actualizar un cliente
async function updateClient(clientId, data) {
  try {
    // Busca el cliente por su ID
    const client = await ClientModel.findByPk(clientId);

    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    // Actualiza los campos del cliente con los datos proporcionados
    const updatedClient = await client.update(data);

    return updatedClient;
  } catch (error) {
    throw new Error('Error al actualizar el cliente con id ' + clientId);
  }
}

// Servicio para obtener un cliente por su id
async function getByIdClient(clientId) {
  try {
    const getClient = await ClientModel.findByPk(clientId);

    return getClient;
  } catch (error) {
    throw new Error('Error al obtener el cliente con id ' + clientId + ' desde la base de datos');
  }
}

// Servicio para obtener todos los clientes
async function getAllClients() {
  try {
    const allClients = await ClientModel.findAll({
      order: [['name', 'ASC']], // Ordena por la columna 'id' de manera ascendente (de menor a mayor)
    });
    return allClients;
  } catch (error) {
    throw new Error('Error al obtener todos los clientes desde la base de datos');
  }
}

async function getContactByClient(clientId) {
  const client = await ClientModel.findByPk(clientId, {
    include: {
      model: ContactModel,
    },
  });

  if (client) {
    const contacts = client ? client.Contacts : [];
    return contacts;
  }

  return null;
}


module.exports = {
  createClient,
  updateClient,
  getByIdClient,
  getAllClients,
  getContactByClient
};