import axios from 'axios';

const BASE_URL = 'http://localhost:7999';

// Obtener el token desde localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Función para manejar solicitudes GET con respuesta gestionada
const getBaseAxiosGetWithResponseManage = async (customUrl) => {
    const token = getAccessToken();
    const options = {
        method: 'GET',
        url: `${BASE_URL}${customUrl}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {

        return error;
    }
};

// Función para manejar solicitudes POST con respuesta gestionada
const getBaseAxiosPostWithResponseManage = async (customUrl, body) => {
    const token = getAccessToken();
    const options = {
        method: 'POST',
        url: `${BASE_URL}${customUrl}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: body,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {

        return error;
    }
};

const getBaseAxiosPutWithResponseManage = async (customUrl, body) => {
    const token = getAccessToken();
    const options = {
        method: 'PUT',
        url: `${BASE_URL}${customUrl}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: body,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {

        return error;
    }
};


export const getClients = () => {
    return getBaseAxiosGetWithResponseManage('/Client/getAll');
};

export const getServiceTypes = () => {
    return getBaseAxiosGetWithResponseManage('/ServiceType/getAll');
};

export const getServices = () => {
    return getBaseAxiosGetWithResponseManage('/service/getAll');
};

export const getUnpaidServices = () => {
    return getBaseAxiosGetWithResponseManage('/service/getUnpaid');
};

export const getContactsByService = (serviceId) => {
    return getBaseAxiosGetWithResponseManage(`/service/getContacts/${serviceId}`);
};

export const getContactsByClient = (clientId) => {
    return getBaseAxiosGetWithResponseManage(`/client/getContacts/${clientId}`);
};

export const createClient = (client) => {
    return getBaseAxiosPostWithResponseManage('/client/create', client);
};

export const createContact = (contact) => {
    return getBaseAxiosPostWithResponseManage('/contact/create', contact);
};

export const createServiceType = (serviceType) => {
    return getBaseAxiosPostWithResponseManage('/serviceType/create', serviceType);
};

export const createService = (service) => {
    return getBaseAxiosPostWithResponseManage('/service/create', service);
};

export const updateService = (serviceId, data) => {
    return getBaseAxiosPutWithResponseManage(`/service/update/${serviceId}`, data);
};

export const updateClient = (clientId, data) => {
    return getBaseAxiosPutWithResponseManage(`/client/update/${clientId}`, data);
};

export const updateContact = (contactId, data) => {
    return getBaseAxiosPutWithResponseManage(`/contact/update/${contactId}`, data);
};

export const sendEmail = (email) => {
    return getBaseAxiosPostWithResponseManage('/send/email', email);
};

export const sendMessage = (message) => {
    return getBaseAxiosPostWithResponseManage('/send/message', message);
};

