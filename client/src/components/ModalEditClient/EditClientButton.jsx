import { useState } from 'react';
import { Modal, Box, Button, TextField, InputAdornment } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { updateClient } from '../../services/hostingDSServerCalls';
import "@fontsource/arimo";


function EditClientButton(client) {

    const [name, setName] = useState(client.client.row.name);
    const [companyName, setCompanyName] = useState(client.client.row.companyName);
    const [rut, setRut] = useState(client.client.row.rut);
    const [adress, setAdress] = useState(client.client.row.adress);
    const [details, setDetails] = useState(client.client.row.details);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)

    };
    const handleClose = () => setOpen(false);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeCompanyName = (event) => {
        setCompanyName(event.target.value);
    };
    const handleChangeRut = (event) => {
        setRut(event.target.value);
    };
    const handleChangeAdress = (event) => {
        setAdress(event.target.value);
    };
    const handleChangeDetails = (event) => {
        setDetails(event.target.value);
    };

    const handleUpdate = async () => {

        if (name && rut && companyName && adress) {

            setOpen(false);
            const body = {
                "name": name,
                "rut": rut,
                "companyname": companyName,
                "details": details,
                "adress": adress,
            };

            const res = await updateClient(client.client.row.id, body);
            console.log(res);
            window.location.reload();
        }
    };

    return (
        <div >

            <Button className='button' onClick={handleOpen} sx={{ backgroundColor: 'grey', color: 'white', fontFamily: 'inherit' }} >Editar Cliente</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box
                    height={425}
                    width={300}
                    sx={{
                        position: 'relative',
                        top: '35%',
                        left: '43%',
                        padding: '10px',
                        border: '2px solid black',
                        borderRadius: 5,
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <ModalTopBar title='Editar Cliente' onclick={handleClose} />
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre" variant="standard" onChange={handleChangeName} value={name} />
                    <TextField sx={{ marginBottom: '10px' }} id="rut" label="Rut" variant="standard" onChange={handleChangeRut} value={rut} />
                    <TextField sx={{ marginBottom: '10px' }} id="companyname" label="Razón Social" variant="standard" onChange={handleChangeCompanyName} value={companyName} />
                    <TextField sx={{ marginBottom: '10px' }} id="details" label="Detalles (Opcional)" variant="standard" onChange={handleChangeDetails} value={details} />
                    <TextField sx={{ marginBottom: '10px' }} id="adress" label="Dirección" variant="standard" onChange={handleChangeAdress} value={adress} />
                    <Button onClick={handleUpdate} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}


export default EditClientButton;
