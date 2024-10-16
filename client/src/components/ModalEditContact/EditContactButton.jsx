import { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, InputAdornment } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import SelectList from '../SelectList/SelectList';
import { updateContact, getContactsByClient } from '../../services/hostingDSServerCalls';
import "@fontsource/arimo";


function EditContactButton(client) {



    const [contacts, setContacts] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [contactId, setContactId] = useState(null);
    const [clientid, setClientid] = useState();
    const [details, setDetails] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getContactsByClient(client.client.row.id).then(result => {
            setContacts(result);
        });
    }, [])

    const handleOpen = () => {
        setOpen(true)

    };
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
    const handleChangeClientid = (event) => {
        setClientid(event.target.value);
    };
    const handleChangeDetails = (event) => {
        setDetails(event.target.value);
    };

    const handleChangeContact = (event) => {
        const selectedContactId = event.target.value;
        setContactId(selectedContactId);

        // Encuentra el contacto seleccionado por ID
        const selectedContact = contacts.find(contact => contact.id === selectedContactId);

        if (selectedContact) {
            // Actualiza los valores de los TextFields con la información del contacto seleccionado
            setName(selectedContact.name);
            setPhone(selectedContact.phone);
            setEmail(selectedContact.email);
            setDetails(selectedContact.details || ''); // Puede que details sea opcional
        }
    };

    const clean = () => {
        setName('');
        setDetails('');
        setEmail('');
        setPhone('');
        setContactId(null);
    }

    const handleUpdate = async () => {

        if (name && phone && email) {

            setOpen(false);
            const body = {
                "name": name,
                "phone": phone,
                "email": email,
                "details": details,
            };

            const res = await updateContact(contactId, body);
            console.log(res);
            clean();
            window.location.reload();
        }
    };

    return (
        <div >

            <Button className='button' onClick={handleOpen} sx={{ backgroundColor: 'grey', color: 'white', fontFamily: 'inherit' }} >Editar Contacto</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box
                    height={460}
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
                    <ModalTopBar title='Editar Contacto/s' onclick={handleClose} />
                    <SelectList inputType='Contacto' inputid='input-contact' onchange={handleChangeContact} list={contacts} value={contactId} ></SelectList>
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre" variant="standard" onChange={handleChangeName} value={name} focused color='grey' />
                    <TextField sx={{ marginBottom: '10px' }} id="phone" label="Telefono" variant="standard" onChange={handleChangePhone} value={phone} focused color='grey' />
                    <TextField sx={{ marginBottom: '10px' }} id="email" label="Email" variant="standard" onChange={handleChangeEmail} value={email} focused color='grey' />
                    <TextField sx={{ marginBottom: '10px' }} id="details" label="Detalles (Opcional)" variant="standard" onChange={handleChangeDetails} value={details} focused color='grey' />
                    <Button onClick={handleUpdate} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}


export default EditContactButton;
