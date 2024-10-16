import { useState, useEffect } from 'react';
import "../ModalAddClientButton/AddClientButton.css"
import { Modal, Box, Button, TextField, InputAdornment } from "@mui/material";
import SelectList from '../SelectList/SelectList';
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { createContact } from '../../services/hostingDSServerCalls';
import "@fontsource/arimo";
import { getClients } from '../../services/hostingDSServerCalls';


function AddContactButton() {

    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [clientId, setClientId] = useState('');
    const [details, setDetails] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getClients().then(result => {
            setClients(result);
        });
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangeClientId = (event) => {
        setClientId(event.target.value);
    };
    const handleChangeDetails = (event) => {
        setDetails(event.target.value);
    };

    const handleSave = async () => {

        if (name && phone && email && clientId) {

            setOpen(false);
            const body = {
                "name": name,
                "phone": `+598${phone}`,
                "email": email,
                "details": details,
                "clientid": clientId,
            };
            console.log(name, phone, email, clientId)
            const res = await createContact(body);
            console.log(res);
            window.location.reload();
        } else {
            alert('Faltan datos obligatorios');
        }

    };

    return (
        <div className='add-client-button'>

            <Button className='button' onClick={handleOpen} sx={{ color: 'white', fontSize: '100%', letterSpacing: '10px', fontFamily: 'inherit' }} >Agregar Contacto</Button>
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    onClick: (event) => event.stopPropagation(),
                }}
            >
                <Box
                    height={450}
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
                    <ModalTopBar title='Agregar Contacto' onclick={handleClose} />
                    <SelectList inputType='Cliente' inputid='input-client' onchange={handleChangeClientId} list={clients} value={clientId} ></SelectList>
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre" variant="standard" onChange={handleChangeName} value={name} />
                    <TextField sx={{ marginBottom: '10px' }} id="phone" label="Telefono" variant="standard" onChange={handleChangePhone} value={phone}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+598</InputAdornment>,
                        }}
                    />
                    <TextField sx={{ marginBottom: '10px' }} id="email" label="Email" variant="standard" onChange={handleChangeEmail} value={email} />
                    <TextField sx={{ marginBottom: '10px' }} id="details" label="Detalles (Opcional)" variant="standard" onChange={handleChangeDetails} value={details} />
                    <Button onClick={handleSave} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}


export default AddContactButton;
