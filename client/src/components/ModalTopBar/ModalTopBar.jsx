import { Button } from "@mui/material";

function ModalTopBar({ onclick, title }) {
    return (
        <div style={{ display: 'flex' }}>
            <h2 style={{ flexGrow: 1 }}>{title}</h2>
            <Button onClick={onclick} sx={{ color: 'black', fontSize: '30px', }} >×</Button>
        </div>
    )
}

export default ModalTopBar;