import AddClientButton from "../components/ModalAddClientButton/AddClientButton";
import AddServiceTypeButton from "../components/ModalAddServiceTypeButton/AddServiceTypeButton";
import NewServiceButton from "../components/ModalAddServiceButton/NewServiceButton";
import ShowServices from "../components/ShowServices/ShowServices";
import AddContactButton from "../components/ModalAddContactButton/AddContactButton";
import ShowClients from "../components/ShowClients/ShowClients";
import ShowAllServices from "../components/ShowAllServices/ShowAllServices";

import './styles/MainScreen.css';
import "@fontsource/koulen";

export default function MainScreen() {

    return (
        <div className="page" >
            <div className="top-bar">
                <img className="title" src="https://i.imgur.com/movwsdD.png" />
                <img className="logo" src="https://i.imgur.com/fh5imXy.png" alt="hostingIcon" />
            </div>
            <div className="layout">
                <div className="button-container">

                    <AddClientButton />
                    <AddContactButton />
                    <AddServiceTypeButton />
                    <NewServiceButton />

                </div>
                <div className="form-container" >
                    <h1 className="list-title" >LISTA DE SERVICIOS IMPAGOS</h1>
                    <ShowServices />
                    <h1 className="list-title" >LISTA DE CLIENTES</h1>
                    <ShowClients />
                    <h1 className="list-title" >LISTA DE SERVICIOS</h1>
                    <ShowAllServices />
                </div>
            </div>
        </div>
    )
}