import { useState } from 'react';
import { Modal, Box, Button, TextField, InputAdornment } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { updateService } from '../../services/hostingDSServerCalls';
import "@fontsource/arimo";


function EditServiceButton(service) {

    const [name, setName] = useState(service.service.row.name);
    const [price, setPrice] = useState(service.service.row.price);
    const [enddate, setEnddate] = useState(service.service.row.enddate);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangeEnddate = (event) => {
        setEnddate(event.target.value);
    };

    const handleUpdate = async () => {

        if (name && price && enddate) {

            const body = {
                "name": name,
                "price": price,
                "enddate": enddate,
            };

            const res = await updateService(service.service.row.id, body);
            console.log(res);
        }
    };

    return (
        <div >

            <Button className='button' onClick={handleOpen} sx={{ backgroundColor: 'grey', color: 'white', fontFamily: 'inherit' }} >Editar Servicio</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    height={300}
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
                    <ModalTopBar title='Editar Servicio' onclick={handleClose} />
                    <TextField sx={{ marginBottom: '10px' }} id="name" label="Nombre" variant="standard" onChange={handleChangeName} value={name} />
                    <TextField sx={{ marginBottom: '10px' }} id="price" label="Precio" variant="standard" onChange={handleChangePrice} value={price} />
                    <TextField sx={{ marginBottom: '10px' }} id="enddate" label="Fecha de Vencimiento" variant="standard" onChange={handleChangeEnddate} value={enddate} />
                    <Button onClick={handleUpdate} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div>

    )
}


export default EditServiceButton;
