import {Button, Nav, Navbar, NavDropdown, NavItem, Tab, Tabs} from "react-bootstrap";
import logo from "../project-images/nwmsu-logo2.png";
import React, {useEffect, useState} from "react";
import Grid from "../components/Grid";
import {useNavigate} from "react-router-dom";
import GenericModal from "./PostProjectModal";

const Dashboard = () => {

    const [showProjectModal, setShowProjectModal] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [projects, setProjects] = useState([]);


    const [isAdmin, setIsAdmin] = useState(false);

    const [key, setKey] = useState('myProjects');

    const setActiveTab = (tabName) =>{

        setKey(tabName)
    };


    useEffect(() => {
        setAdminFlag();
        fetchProjects();
    }, []);

    const navigate = useNavigate(),

    setAdminFlag = function () {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/project/getProjectsByName`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setProjects(data);
            } else {
                console.error('Error fetching data:', response.statusText);
                navigate('/')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const onLogout = function () {

        navigate('/');
        localStorage.clear();
    }


    return (
        <div className="container-fluid">

            <Navbar bg="light" className="p-0" style={{height: 100}} sticky="top">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="160"
                        height="50"
                        className="d-inline-block align-content-between"
                    />{' '}
                    <span className="font-weight-bold">Project Explorer</span>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a>{localStorage.getItem('username')}</a>
                    </Navbar.Text>
                    <NavDropdown title='' id="collapsible-nav-dropdown">
                        <NavDropdown.Item onClick={() => setShowProfile(true)}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>

                </Navbar.Collapse>
            </Navbar>
            <div className="row">
                <div className="bg-dark min-vh-100" style={{paddingTop: '30px', maxWidth: '90px'}}>

                    <Nav fill className="flex-column">
                        <Nav.Link onClick={() => setShowProfile(true)}>
                                <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i><p>Profile</p>
                        </Nav.Link>
                        <Nav.Link hidden={isAdmin} onClick={() => setShowProjectModal(true)} >
                                <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i><p>Post</p>
                        </Nav.Link>
                        <Nav.Link onClick={() => setKey("myProjects")}>
                                <i className="fa fa-list fa-2x" aria-hidden="true"></i><p> Projects</p>
                        </Nav.Link>
                        <Nav.Link onClick={() => setKey("approved")}>
                                <i className="fa fa-check-circle fa-2x" aria-hidden="true"></i><p>Approved Projects</p>
                        </Nav.Link>
                        <Nav.Link onClick={() => setKey("rejected")}>
                                <i className="fa fa-close fa-2x" aria-hidden="true"></i><p>Rejected Projects</p>
                        </Nav.Link>
                        <Nav.Link hidden={!isAdmin} onClick={() => setKey("pending")}>
                                <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><p> Pending </p>
                        </Nav.Link>
                    </Nav>
                </div>
                <div className="col-md-11">
                    <div  className="container col-md-12 d-flex justify-content-end p-3">
                        <Button hidden={isAdmin} variant="primary" onClick={() => setShowProjectModal(true)}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Post Project</Button>
                    </div>
                    <div className='container col-md-12'>
                        <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="uncontrolled-tab-example">
                            <Tab eventKey="myProjects" title={isAdmin ? "User Projects":"My Projects"}>
                                <div className="col-md-12 p-5">
                                    <Grid showAction = "false" data={projects} title={isAdmin ? "All Projects":"My Projects"}></Grid>
                                </div>
                            </Tab>

                            <Tab eventKey="approved" title="Approved">
                                <div className="col-md-12 p-5">
                                    <Grid showAction = "false"  data={projects.filter(project => project.status === 'Approved')}></Grid>
                                </div>
                            </Tab>
                            <Tab eventKey="rejected" title="Rejected" >
                                <div className="col-md-12 p-5">
                                    <Grid showAction = "false" data={projects.filter(project => project.status === 'Rejected')}></Grid>
                                </div>
                            </Tab>
                            <Tab eventKey="pending" title="Pending for Approval" disabled = {!isAdmin}>
                                <div className="col-md-12 p-5">
                                    <Grid showAction = "true" fetchProjects = {fetchProjects} data={projects.filter(project => project.status === 'Pending')}></Grid>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <GenericModal show={showProjectModal} type='postProject' title="Post Project"
                          onHide={() => setShowProjectModal(false)}></GenericModal>
            <GenericModal show={showProfile} type='profile' title="Profile"
                          onHide={() => setShowProfile(false)}></GenericModal>
        </div>
    )
}

export default Dashboard;
