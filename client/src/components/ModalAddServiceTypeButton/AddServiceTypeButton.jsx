import { useState } from 'react';
import "./AddServiceTypeButton.css"
import { Modal, Box, Button, TextField } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { createServiceType } from '../../services/hostingDSServerCalls';

function AddServiceTypeButton() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleSave = async () => {

        if (name) {

            setOpen(false);
            const body = {
                "name": name,
                "type": type
            };
            const res = await createServiceType(body);
            window.location.reload();

        } else {
            alert('Faltan datos obligatorios');
        }

    };

    return (
        <div className='add-service-button'>

            <Button className='button' onClick={handleOpen} sx={{ color: 'white', fontSize: '100%', letterSpacing: '10px', fontFamily: 'inherit' }}>Agregar Tipo De Servicio</Button>
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    onClick: (event) => event.stopPropagation(),
                }}
            >
                <Box
                    height={250}
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
                    <ModalTopBar title='Agregar Servicio' onclick={handleClose} />
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre de servicio" variant="standard" onChange={handleChangeName} value={name} />
                    <TextField sx={{ marginBottom: '10px' }} id="type" label="Tipo (Opcional)" variant="standard" onChange={handleChangeType} value={type} />
                    <Button onClick={handleSave} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default AddServiceTypeButton;
