
import "./ClientListButton.css"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function ClientListButton() {

    return (
        <div className='client-list-button'>
            <Link to='/clients'>
                <Button className="button" sx={{ color: 'white', fontSize: '150%' }} >
                    Listado de clientes
                </Button>
            </Link>
        </div>

    )
}

export default ClientListButton;
