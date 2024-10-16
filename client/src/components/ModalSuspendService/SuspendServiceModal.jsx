import { useState } from 'react';
import { Modal, Box, Button } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { updateService } from '../../services/hostingDSServerCalls';
import { sendEmail, sendMessage } from '../../services/hostingDSServerCalls';

function SuspendServiceModal(service) {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSuspend = async () => {
        const notify = await Promise.all(service.service.row.contactlist.map(async (contact) => {

            const bodyEmail = {
                "clientEmail": contact.email,
                "body": `Hola ${contact.name}. Su servicio de ${service.service.row.serviceType} ha sido suspendido.`,
                "subject": "Suspensión de servicio"
            };

            const bodyMessage = {
                "recipientNumber": contact.phone,
                "clientName": contact.name,
                "serviceType": service.service.row.serviceType,
                "template": "service_suspend"
            }

            sendEmail(bodyEmail);
            sendMessage(bodyMessage);

        }));
        const body = {
            "active": false
        }

        const res = await updateService(service.service.row.id, body);
        console.log(res);
        setOpen(false);
        window.location.reload();
    };

    return (
        <div >

            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                style={{ backgroundColor: 'red', color: 'white' }}
            >Suspender</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    height={200}
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
                    <ModalTopBar title='Suspender Servicio' onclick={handleClose} />
                    <p>Seguro que quiere suspender el servicio? <br /> No se enviarán más recordatorios</p>
                    <Button variant="contained" onClick={handleSuspend} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }} >Suspender</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default SuspendServiceModal;
