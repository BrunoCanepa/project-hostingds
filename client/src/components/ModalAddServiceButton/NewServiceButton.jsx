import { useState, useEffect } from 'react';
import "./NewServiceButton.css"
import { Modal, Box, Button, TextField, FormControlLabel, Switch } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import SelectList from '../SelectList/SelectList';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { getClients, getServiceTypes, createService } from '../../services/hostingDSServerCalls'

function addOneYear(dateString) {
    const date = new Date(dateString);

    date.setFullYear(date.getFullYear() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function NewServiceButton() {

    const [clients, setClients] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);

    useEffect(() => {
        getClients().then(result => {
            setClients(result);
        });
    }, [])

    useEffect(() => {
        getServiceTypes().then(result => {
            setServiceTypes(result);
        });
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeClient = (event) => {
        setClientId(event.target.value);
    };
    const handleChangeServiceType = (event) => {
        setServiceTypeId(event.target.value);
    };
    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
    };
    const handleTypeChange = (event) => {
        setPayment(event.target.value);
    }
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleSwitchChange = (event) => {
        setPaid(event.target.checked);
    }
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const [clientId, setClientId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [serviceTypeId, setServiceTypeId] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [payment, setPayment] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [paid, setPaid] = useState(false);
    const [active, setActive] = useState(true);
    const [eliminated, setEliminated] = useState(false);

    useEffect(() => {
        const endDateUpdate = () => {
            if (payment == 'Anual') {
                setEndDate(addOneYear(startDate));
                setActive(true);
            } else {
                setActive(false);
                setEndDate(startDate);
            }
        };

        endDateUpdate();
    }, [payment]);

    const handleSave = async () => {

        if (name && price && startDate && clientId && serviceTypeId && payment) {


            setOpen(false);

            const body = {
                "name": name,
                "price": price,
                "startdate": startDate,
                "enddate": endDate,
                "paid": paid,
                "payment": payment,
                "active": active,
                "clientid": clientId,
                "servicetypeid": serviceTypeId,
                "eliminated": eliminated
            };

            const res = await createService(body);
            console.log(res);

            window.location.reload();

        } else {
            alert('Faltan datos obligatorios');
        }

    };

    return (
        <div className='new-service-button'>

            <Button className='button' onClick={handleOpen} sx={{ color: 'white', fontSize: '100%', letterSpacing: '10px', fontFamily: 'inherit' }} >Nuevo Servicio</Button>
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{
                    onClick: (event) => event.stopPropagation(),
                }}
            >
                <Box
                    height={550}
                    width={350}
                    sx={{
                        position: 'relative',
                        top: '25%',
                        left: '41%',
                        padding: '10px',
                        border: '2px solid black',
                        borderRadius: 5,
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <ModalTopBar title='Nuevo Servicio' onclick={handleClose} />
                    <TextField onChange={handleChangeName} id="name" label="Nombre" variant="standard" sx={{ marginBottom: '10px' }} value={name} />
                    <SelectList inputType='Cliente' inputid='input-client' onchange={handleChangeClient} list={clients} value={clientId} ></SelectList>
                    <SelectList inputType='Servicio' inputid='input-service' onchange={handleChangeServiceType} list={serviceTypes} value={serviceTypeId} ></SelectList>
                    <DateRangePicker onStartDateChange={handleStartDateChange} startDate={startDate} onTypeChange={handleTypeChange} />
                    <TextField onChange={handleChangePrice} type="number" id="price" label="Precio" variant="standard" sx={{ marginBottom: '10px' }} value={price} />
                    <FormControlLabel control={<Switch checked={paid} onChange={handleSwitchChange} />} label="Pagado" />
                    <Button onClick={handleSave} sx={{ marginTop: '10px' }} >Guardar</Button>
                </Box>
            </Modal>
        </div >

    )
}

export default NewServiceButton;
