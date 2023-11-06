import {Modal, Nav, Navbar} from "react-bootstrap";
import logo from "../project-images/nwmsu-logo.png";
import {Link} from "react-router-dom";
import Signup from "../project-ui/Signup";
import Login from "../project-ui/Login";
import React, {useState} from "react";
import SearchComponent from "./search/SearchComponent";

const NewHeader = () => {

    const [sign, setSign] = useState(false);
    const [login, setLogin] = useState(false);
    const [search, setSearch] = useState(false),

    onOpenSignup = () => {
        setSign(true)
    },

    onOpenLogin = () => {
        setLogin(true)
    },

    onOpenSearch = () => {
        setSearch(true)
    },

    onCloseSignup = () => {
        setSign(false)
    },

    onCloseLogin = () => {
        setLogin(false)
    },

    onCloseSearch = () => {
        setSearch(false)
    };

    return (
        <>
            <Navbar bg="light" style={{height: 80}}>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="200"
                        height="65"
                        className="d-inline-block align-content-between"
                    />{' '}
                    <span className="font-weight-bold">Project Explorer</span>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link className="m-2" onClick={onOpenSearch}>
                        <i className="fa fa-search nwthemecolor"></i>
                        {'  '}Search</Nav.Link>
                    <Nav.Link className="m-2" onClick={onOpenLogin}>Login</Nav.Link>
                    <Nav.Link className="m-2" onClick={onOpenSignup}>Signup</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal  centered="true" size="lg" show={sign} onHide={onCloseSignup}>
                <Signup></Signup>
            </Modal>

            <Modal  centered="true" size="lg" show={login} onHide={onCloseLogin}>
                <Login></Login>
            </Modal>
            <Modal size="lg" show={search} onHide={onCloseSearch}>
                <SearchComponent></SearchComponent>
            </Modal>
        </>
    )

}

export default NewHeader;

