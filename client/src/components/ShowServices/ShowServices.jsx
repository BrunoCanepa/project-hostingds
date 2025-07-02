import './ShowServices.css'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import { getUnpaidServices } from '../../services/hostingDSServerCalls'
import { useState, useEffect } from 'react'
import SuspendServiceModal from '../ModalSuspendService/SuspendServiceModal'
import EliminateServiceModal from '../ModalEliminateService/EliminateServiceModal'
import { updateService, getContactsByService } from '../../services/hostingDSServerCalls'
import EditServiceButton from '../ModalEditService/EditService'

function ShowServices() {

    const [services, setServices] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [data, setData] = useState([]);

    const handlePay = async (serviceId) => {

        const body = {
            "paid": true,
        };
        const res = await updateService(serviceId, body);
        window.location.reload();

    };

    const handleActivate = async (serviceId, eliminated) => {
        if (!eliminated) {
            const body = {
                "active": true,
            };
            const res = await updateService(serviceId, body);

        } else {
            alert("No se puede activar. El servicio ha sido eliminado.");
        }
        window.location.reload();

    }


    useEffect(() => {
        getUnpaidServices().then(result => {
            setServices(result);
        });
    }, [])

    useEffect(() => {
        if (services && services.length > 0) {
            const fetchData = async () => {
                const temp = await Promise.all(services.map(async (service) => {

                    let contacts = await getContactsByService(service.id);

                    if (!Array.isArray(contacts)) {
                        contacts = [];
                    }
                    const contactNames = contacts.map(contact => contact.name).join(', ');
                    return {
                        id: service.id,
                        name: service.name,
                        client: service.Client.name,
                        serviceType: service.ServiceType.name,
                        serviceTypePlan: service.ServiceType.type,
                        price: service.price,
                        startdate: service.startdate,
                        enddate: service.enddate,
                        paymentState: service.paid,
                        isActive: service.active,
                        eliminated: service.eliminated,
                        contacts: contactNames,
                        contactlist: contacts,
                    };
                }));
                setData(temp);
            };
            fetchData();
        }
    }, [services]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 150,
            editable: true,
        },
        {
            field: 'client',
            headerName: 'Cliente',
            width: 150,
            editable: true,
        },
        {
            field: 'serviceType',
            headerName: 'Tipo de servicio',
            width: 160,
            editable: true,
            renderCell: (params) => (
                <span>
                    {params.row.serviceType}
                    {params.row.serviceTypePlan ? `, ${params.row.serviceTypePlan}` : ''}
                </span>
            ),
        },
        {
            field: 'price',
            headerName: 'Precio',
            width: 90,
            editable: true,
        },
        {
            field: 'startdate',
            headerName: 'Fecha de inicio',
            width: 120,
            editable: true,
        },
        {
            field: 'enddate',
            headerName: 'Fecha de finalización',
            width: 150,
            editable: true,
        },
        {
            field: 'contacts',
            headerName: 'Contactos',
            width: 130,
            hide: true,
        },
        {
            field: 'isActive',
            headerName: 'Estado',
            width: 120,
            renderCell: (params) => (
                <span style={{ color: params.row.eliminated ? 'gray' : params.value ? 'green' : 'red' }}>
                    {params.row.eliminated ? 'Eliminado' : params.value ? 'Activo' : 'Inactivo'}
                </span>
            ),
            editable: true,
        },
        {
            field: 'paymentState',
            headerName: 'Estado del pago',
            width: 120,
            renderCell: (params) => (
                <span style={{ color: params.value ? 'green' : 'red' }}>
                    {params.value ? 'Pago' : 'Impago'}
                </span>
            ),
            editable: true,
        },
        {
            field: 'suspend',
            headerName: '',
            width: 120,
            renderCell: (params) => (

                <SuspendServiceModal service={params} />

            ),
        },
        {
            field: 'activate',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleActivate(params.id, params.row.eliminated)}
                        style={{ backgroundColor: 'orange', color: 'white' }}
                    >
                        Activar
                    </Button>
                </div>
            ),
        },
        {
            field: 'pay',
            headerName: '',
            width: 80,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePay(params.id)}
                        style={{ backgroundColor: 'green', color: 'white' }}
                    >
                        Pagar
                    </Button>
                </div>
            ),
        },
        {
            field: 'eliminate',
            headerName: '',
            width: 120,
            renderCell: (params) => (

                <EliminateServiceModal service={params} />

            ),
        },
        {
            field: 'edit',
            headerName: '',
            width: 160,
            renderCell: (params) => (

                <EditServiceButton service={params} />

            ),
        },
    ];



    return (
        <div className="container" >
            <Box sx={{ width: '100%', }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                        sorting: {
                            sortModel: [{ field: 'id', sort: 'asc' }],
                        },
                    }}
                    pageSizeOptions={[5]}
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

export default ShowServices;

