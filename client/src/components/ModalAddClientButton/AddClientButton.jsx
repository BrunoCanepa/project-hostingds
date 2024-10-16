import { useState } from 'react';
import "./AddClientButton.css"
import { Modal, Box, Button, TextField, InputAdornment } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { createClient } from '../../services/hostingDSServerCalls';
import "@fontsource/arimo";


function AddClientButton() {

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [rut, setRut] = useState('');
    const [adress, setAdress] = useState('');
    const [details, setDetails] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
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

    const handleSave = async () => {

        if (name && rut && companyName && adress) {

            setOpen(false);
            const body = {
                "name": name,
                "rut": rut,
                "companyname": companyName,
                "details": details,
                "adress": adress,
            };
            const res = await createClient(body);
            window.location.reload();
        } else {
            alert('Faltan datos obligatorios');
        }

    };

    return (
        <div className='add-client-button'>

            <Button className='button' onClick={handleOpen} sx={{ color: 'white', fontSize: '100%', letterSpacing: '10px', fontFamily: 'inherit' }} >Agregar Cliente</Button>
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    onClick: (event) => event.stopPropagation(),
                }}
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
                    <ModalTopBar title='Agregar Cliente' onclick={handleClose} />
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre" variant="standard" onChange={handleChangeName} value={name} />
                    <TextField sx={{ marginBottom: '10px' }} id="rut" label="Rut" variant="standard" onChange={handleChangeRut} value={rut} />
                    <TextField sx={{ marginBottom: '10px' }} id="companyname" label="Razón Social" variant="standard" onChange={handleChangeCompanyName} value={companyName}
                    /*InputProps={{
                        startAdornment: <InputAdornment position="start">+598</InputAdornment>,
                    }}*/
                    />
                    <TextField sx={{ marginBottom: '10px' }} id="details" label="Detalles (Opcional)" variant="standard" onChange={handleChangeDetails} value={details} />
                    <TextField sx={{ marginBottom: '10px' }} id="adress" label="Dirección" variant="standard" onChange={handleChangeAdress} value={adress} />
                    <Button onClick={handleSave} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}


export default AddClientButton;
