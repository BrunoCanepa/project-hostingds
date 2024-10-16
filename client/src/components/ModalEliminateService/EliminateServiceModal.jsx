import { useState } from 'react';
import { Modal, Box, Button } from "@mui/material";
import ModalTopBar from '../ModalTopBar/ModalTopBar';
import { updateService } from '../../services/hostingDSServerCalls';
import { sendEmail, sendMessage } from '../../services/hostingDSServerCalls';

function EliminateServiceModal(service) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEliminate = async () => {
        const notify = await Promise.all(service.service.row.contactlist.map(async (contact) => {

            const bodyEmail = {
                "clientEmail": contact.email,
                "body": `Hola ${contact.name}. Su servicio de ${service.service.row.serviceType} ha sido dado de baja.`,
                "subject": "Cancelación de servicio"
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
            "active": false,
            "eliminated": true
        }

        const res = await updateService(service.service.row.id, body);
        console.log(res);
        setOpen(false);
        window.location.reload();
    };

    return (
        <div>
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                style={{ backgroundColor: 'purple', color: 'white' }}
            >Dar de baja</Button>
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
                    <ModalTopBar title='Dar de baja Servicio' onclick={handleClose} />
                    <p>Seguro que quiere dar de baja el servicio? <br /> No se podrá volver a activar</p>
                    <Button variant="contained" onClick={handleEliminate} style={{ marginTop: '10px', backgroundColor: 'purple', color: 'white' }} >Dar de baja</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default EliminateServiceModal;
