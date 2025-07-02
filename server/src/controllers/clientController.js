const ClientService = require('../services/clientService');

async function getAllClients(req, res) {
  try {
    const clients = await ClientService.getAllClients();
    if (clients.length > 0) {
      return res.status(200).json(clients);
    } else {
      return res.status(204).json({ message: 'No hay Clientes' });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Error al obtener los Clientes', error: error.message });
  }
}


async function getContactByClient(req, res) {
  const clientId = req.params.clientId
  try {
    const contacts = await ClientService.getContactByClient(clientId);
    console.log(contacts);
    if (contacts.length > 0) {
      return res.status(200).json(contacts);
    } else {
      return res.status(204).json({ message: 'No hay Contactos' });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Error al obtener los Contactos', error: error.message });
  }
}

async function getByIdClient(req, res) {
  const clientId = req.params.clientId;

  try {
    const client = await ClientService.getByIdClient(clientId);
    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(204).json({ message: 'No hay Clientes' });
    }
  } catch (error) {
    return res.status(404).json({ message: 'Error al obtener el Cliente', error: error.message });
  }
}

async function createClient(req, res) {
  try {

    const { name, rut, companyname, details, adress } = req.body;

    if (!name || !rut || !companyname) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const newClient = await ClientService.createClient({
      name, rut, companyname, details, adress
    });

    if (newClient) {
      return res.status(201).json(newClient);
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el cliente', error: error.message });
  }
}

async function updateClient(req, res) {
  const clientId = req.params.clientId;
  const data = req.body;

  try {
    const updatedClient = await ClientService.updateClient(clientId, data);
    if (updatedClient) {
      return res.status(200).json(updatedClient);
    } else {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar el Cliente', error: error.message });
  }
}



module.exports = {
  getByIdClient,
  getAllClients,
  createClient,
  getContactByClient,
  updateClient
};