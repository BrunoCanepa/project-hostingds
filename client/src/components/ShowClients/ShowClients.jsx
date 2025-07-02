import { Link } from "react-router-dom";
import { getClients, getContactsByClient } from "../../services/hostingDSServerCalls";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import './ShowClients.css'
import EditClientButton from "../ModalEditClient/EditClientButton";
import EditContactButton from "../ModalEditContact/EditContactButton";

function ClientListScreen() {

    const [clients, setClients] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getClients().then(result => {
            setClients(result);
        });
    }, [])

    useEffect(() => {
        if (clients && clients.length > 0) {
            const fetchData = async () => {
                const temp = await Promise.all(clients.map(async (client) => {

                    let contacts = await getContactsByClient(client.id);
                    if (!Array.isArray(contacts)) {
                        contacts = [];
                    }
                    const contactNames = contacts.map(contact => contact.name).join(', ');
                    const contactPhones = contacts.map(contact => contact.phone).join(', ');
                    const contactEmails = contacts.map(contact => contact.email).join(', ');
                    return {
                        id: client.id,
                        name: client.name,
                        companyName: client.companyname,
                        rut: client.rut,
                        adress: client.adress,
                        details: client.details,
                        contactNames: contactNames,
                        contactPhones: contactPhones,
                        contactEmails: contactEmails

                    };
                }));
                setData(temp);
            };
            fetchData();
        }
    }, [clients]);
    /*client.client.row.companyName);
        const [rut, setRut] = useState(client.client.row.rut);
        const [adress, setAdress] = useState(client.client.row.adress);
        const [details, setDetails] = useState(client.client.row.details);*/

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 150,
            editable: true,
        },
        {
            field: 'contactNames',
            headerName: 'Contactos',
            width: 250,
            editable: true,
        },
        {
            field: 'contactPhones',
            headerName: 'Telefonos',
            width: 300,
            editable: true,
        },
        {
            field: 'contactEmails',
            headerName: 'Emails',
            width: 500,
            editable: true,
        },
        {
            field: 'edit',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <EditClientButton client={params} />
            ),
        },
        {
            field: 'editContact',
            headerName: '',
            width: 150,
            renderCell: (params) => (
                <EditContactButton client={params} />
            ),
        },
    ]

    return (
        <div className="containerClients">
            <Box sx={{ height: '85%', width: '100%', }} >
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                        },
                    }}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: () => (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <GridToolbar
                                    sx={{
                                        '& .MuiButtonBase-root': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                        ),
                    }}
                    sx={{
                        paddingLeft: '1%',
                        fontFamily: 'inherit',
                        '& .MuiDataGrid-toolbarContainer': {
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'black',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'black',
                        },
                        borderColor: 'white',
                        bgcolor: 'white',
                        borderRadius: '50px'
                    }}

                />
            </Box>
        </div>
    )
}

export default ClientListScreen;