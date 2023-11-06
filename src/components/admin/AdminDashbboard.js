import {Container, Tab, Tabs} from "react-bootstrap";
import ProjectCard from "../project/ProjectCard";
import Grid from "../Grid";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const navigate = useNavigate();

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
        <Container className="mt-4">
            <Tabs id="uncontrolled-tab-example" justify>
                <Tab eventKey="myProjects" title={ "User Projects"}>
                    <div className="p-5">
                        <ProjectCard projects={projects}> </ProjectCard>
                    </div>
                </Tab>
                <Tab eventKey="pending" title="Pending for Approval">
                    <div className="p-5">
                        <Grid showAction="true" fetchProjects={fetchProjects}
                              data={projects.filter(project => project.status === 'Pending')}></Grid>
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default AdminDashboard;
