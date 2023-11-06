import {Badge, Button, Container, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import ProjectCard from "../components/project/ProjectCard";
import Grid from "../components/Grid";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import GenericModal from "./PostProjectModal";

const DashboardLanding = () => {
    const [showProjectModal, setShowProjectModal] = useState(false);

    const [projects, setProjects] = useState([]);


    const [isAdmin, setIsAdmin] = useState(false);

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
            const response = await fetch(`/project/getProjectsByName?username=`, {
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
    return (
        <Row>
            <Container className="col-md-9">
                <h4 className="nwthemecolor pt-4"> Projects you might be interested in </h4>
                <div className="p-3 scrollScreen">
                    <ProjectCard count={1} projects={projects}> </ProjectCard>
                </div>
            </Container>
            <Container className="col-md-3">
                <Container className="pt-5">
                    <h6 className="nwthemecolor"><i className="fa fa-angle-double-up fa-lg"></i>Trending Projects</h6>
                    <ListGroup as="ol">
                        {
                            projects.slice(0, 4).map((project) => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{project.title}</div>
                                        {project.description}
                                    </div>
                                </ListGroup.Item>
                            ))
                        }

                    </ListGroup>
                </Container>
                <Container className="pt-3">
                    <h6 className="nwthemecolor"><i className="fa fa-fighter-jet fa-lg"></i> Top Projects</h6>
                    <ListGroup as="ol">
                        {
                            projects.slice(Math.max(projects.length - 4, 0)).map((project) => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{project.title}</div>
                                        {project.description}
                                    </div>
                                </ListGroup.Item>
                            ))
                        }

                    </ListGroup>
                </Container>
            </Container>
            <GenericModal show={showProjectModal} type='postProject' title="Post Project"
                          onHide={() => setShowProjectModal(false)}></GenericModal>
        </Row>
    )

}


export default DashboardLanding
