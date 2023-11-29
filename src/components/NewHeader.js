import {Modal, Nav, Navbar} from "react-bootstrap";
import logo from "../project-images/nwmsu-logo2.png";
import {Link} from "react-router-dom";
import Signup from "../project-ui/Signup";
import Login from "../project-ui/Login";
import React, {useState} from "react";

const NewHeader = () => {

    const [sign, setSign] = useState(false);
    const [login, setLogin] = useState(false),

    onOpenSignup = () => {
        setSign(true)
    },

    onOpenLogin = () => {
        setLogin(true)
    },

    onCloseSignup = () => {
        setSign(false)
    },

    onCloseLogin = () => {
        setLogin(false)
    };

    return (
        <>
            <Navbar bg="light" style={{height: 100}}>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="150"
                        height="50"
                        className="d-inline-block align-content-between"
                    />{' '}
                    <span className="font-weight-bold">Project Explorer</span>
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link className="m-2" onClick={onOpenLogin}>Login</Link>
                    <Link className="m-2" onClick={onOpenSignup}>Signup</Link>
                </Nav>
            </Navbar>
            <Modal  centered="true" size="lg" show={sign} onHide={onCloseSignup}>
                <Signup></Signup>
            </Modal>

            <Modal  centered="true" size="lg" show={login} onHide={onCloseLogin}>
                <Login></Login>
            </Modal>
        </>
    )

}

export default NewHeader;

