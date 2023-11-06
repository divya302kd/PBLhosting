import {Button, Col, Container, Form, Image, Row, Tab, Tabs} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import logo from '../project-images/user.png';
import {useNavigate} from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard";
import Grid from "../components/Grid";

const ProfileForm = (props) => {

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setAdminFlag();
        fetchProjects();
        fetchProfile();
    }, []);

    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/user/fetch`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setFormData(data);
            } else {
                console.error('Error fetching data:', response.statusText);
                navigate('/')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((formData) => ({
            ...formData,
            [name]: newValue,
        }));
    };

    const [showProjectModal, setShowProjectModal] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [projects, setProjects] = useState([]);


    const [isAdmin, setIsAdmin] = useState(false);

    const [key, setKey] = useState('myProjects');


    const setAdminFlag = function () {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/project/getProjectsByName?username=${localStorage.getItem('username')}`, {
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
    /*noValidate validated={validated} onSubmit={handleSubmit}*/

    return (
        <Container className="m-3">
            <h4 className="text-center nwthemecolor p-2">{formData.firstName.toUpperCase()}</h4>
            <Row>
                <Container className="col-md-6">
                    <h5 className="nwthemecolor text-center"> My Projects</h5>
                    <div className="p-5 scrollScreen">

                        <ProjectCard count={1} projects={projects}> </ProjectCard>
                    </div>
                </Container>
                <Container className="col-md-6">
                    <Form>
                        <Row className="justify-content-center">
                            <Col xs={6} md={4}>
                                <Image src={logo} width={"120px"} height={"120px"} roundedCircle/>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label className="font-weight-bold">First Name</Form.Label>
                                <Form.Control readOnly type="text" placeholder="First Name" name="firstName" required
                                              value={formData.firstName} onChange={handleChange}/>
                                <Form.Control.Feedback type="invalid">
                                    Mandatory
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label className="font-weight-bold">Last Name</Form.Label>
                                <Form.Control readOnly type="text" placeholder="Last Name" name="lastName" required
                                              value={formData.lastName}
                                              onChange={handleChange}/>
                                <Form.Control.Feedback type="invalid">
                                    Mandatory
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="email">
                            <Form.Label className="font-weight-bold">Email</Form.Label>
                            <Form.Control plaintext readOnly type="email" placeholder="Email" required
                                          value={formData.email} name="email"
                                          onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="contactNumber">
                            <Form.Label className="font-weight-bold">Contact Number</Form.Label>
                            <Form.Control readOnly type="tel" minLength="10" maxLength="10" name="mobile"
                                          placeholder="Contact Number"
                                          required value={formData.mobile} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-end">
                            <Button className="m-4" variant="danger" onClick={props.close}>Close</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Row>

        </Container>
    )

}

export default ProfileForm
