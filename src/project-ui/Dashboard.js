import {
    Badge,
    Button,
    Card,
    Col, Container, Form,
    InputGroup,
    Modal,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    Row,
    Tab,
    Tabs
} from "react-bootstrap";
import logo from "../project-images/nwmsu-logo.png";
import React, {useEffect, useState} from "react";
import Grid from "../components/Grid";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import GenericModal from "./PostProjectModal";
import SearchComponent from "../components/search/SearchComponent";
import XHRUtil from "../components/XHRUtil";
import ProjectCard from "../components/project/ProjectCard";

const Dashboard = () => {

    const [showProjectModal, setShowProjectModal] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [projects, setProjects] = useState([]);


    const [isAdmin, setIsAdmin] = useState(false);

    const [key, setKey] = useState('myProjects');

    const [search, setSearch] = useState(false);

    const setActiveTab = (tabName) => {

            setKey(tabName)
        },

        onOpenSearch = () => {
            setSearch(true)
        },

        onCloseSearch = () => {
            setSearch(false)
        };


    useEffect(() => {
        setAdminFlag();
    }, []);

    const navigate = useNavigate(),

        setAdminFlag = function () {
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
        };


    const onLogout = function () {

        navigate('/');
        localStorage.clear();
    }


    return (
        <Container fluid>

            <Navbar bg="light" style={{height: 80}}>
                <Navbar.Brand href="#home">
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
                    <Nav.Link className="m-2" onClick={onOpenSearch}>
                        <InputGroup size="md">
                            <InputGroup.Text id="basic-addon1"> <i
                                className="fa fa-search fa-lg nwthemecolor"></i></InputGroup.Text>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Username"
                                aria-describedby="basic-addon1" readOnly
                            />
                        </InputGroup>

                    </Nav.Link>
                    <NavDropdown title={localStorage.getItem('username')} id="collapsible-nav-dropdown">
                        <NavLink to="/Dashboard/profile" className={"m-3"}>
                            <i className="fa fa-user-circle text-dark" aria-hidden="true"> Profile</i>
                        </NavLink>
                        <NavLink to="/" className={"m-3"}>
                            <i className="fa fa-sign-out text-dark" aria-hidden="true"> Logout</i>
                        </NavLink>
                    </NavDropdown>

                </Navbar.Collapse>
            </Navbar>
            <div className="row">
                <div className="bg-dark min-vh-100 col-md-1" style={{paddingTop: '30px', maxWidth: '90px'}}>

                    <Nav justify className="flex-column align-items-stretch">
                        <NavLink to={isAdmin ? "/Dashboard/admin"  : "/Dashboard/landing"} className={"m-3"}>
                            <i className="fa fa-list fa-2x text-white" aria-hidden="true"></i>
                        </NavLink>
                        <NavLink to="/Dashboard/profile" className={"m-3"}>
                            <i className="fa fa-user-circle fa-2x text-white" aria-hidden="true"></i>
                        </NavLink>

                        <NavLink to="/Dashboard/postProject" hidden={isAdmin} className={"m-3"}>
                            <i className="fa fa-plus-circle fa-2x text-white" aria-hidden="true"></i>
                        </NavLink>
                    </Nav>
                </div>
                <div className="col-md-11 m-3" style={{
                    overflow: 'scroll',
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                }}>
                    <Outlet>
                    </Outlet>
                </div>
            </div>
            <GenericModal fullscreen show={showProjectModal} type='postProject' title="Post Project"
                          onHide={() => setShowProjectModal(false)}></GenericModal>
            <GenericModal show={showProfile} type='profile' title="Profile"
                          onHide={() => setShowProfile(false)}></GenericModal>
            <Modal size="lg" show={search} onHide={onCloseSearch}>
                <SearchComponent></SearchComponent>
            </Modal>
        </Container>
    )
}

export default Dashboard;
