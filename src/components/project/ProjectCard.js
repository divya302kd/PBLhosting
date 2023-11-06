import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import XHRUtil from "../XHRUtil";
import React, {useState} from "react";
import Comments from "./Comments";

const ProjectCard = (props) => {

    const [showComments, setShowComments] = useState(false);

    const [projectId, setProjectId] = useState(0);

    const handleClose = () => setShowComments(false);

    let getComments = (e) => {
        let projectId = e.target.value;
        setProjectId(projectId);
        setShowComments(true);
    }

    return (
        <>

            <Row xs={1} md={2} lg={props.count || 2} className="g-4">
                {props?.projects.map((project, index) => (
                    <Col key={index}>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between" style={{fontSize: '12px'}}>
                                    <span className="text-muted">{project.privacy}</span>
                                    <span> <i
                                        className="fa fa-calendar-o "></i> {XHRUtil.convertDate(project.startDate)} </span>
                                </div>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>
                                    {project.description}

                                </Card.Text>
                                {
                                    project?.categories?.map((tech, badgeIndex) => (
                                        <Badge key={'badge-' + index + badgeIndex} pill bg="light"
                                               text="dark">{tech}</Badge>
                                    ))
                                }
                            </Card.Body>
                            <Card.Footer>
                                <div>
                                    <Button value={project.projectId} size="md" className="text-primary"
                                            variant="outline-light">
                                        <i className="fa fa-thumbs-up fa-lg"></i> {10}
                                    </Button>
                                    <Button value={project.projectId} size="md" className="text-danger"
                                            variant="outline-light">
                                        <i className="fa fa-thumbs-o-down fa-lg"></i> {10}
                                    </Button>
                                    <Button value={project.projectId} size="md" className="text-success"
                                            variant="outline-light" onClick={getComments}>
                                        <i className="fa fa-comment-o fa-lg"></i> {10}
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Comments show={showComments} onHide={handleClose} projectdataid={projectId}></Comments>
        </>
    )

}

export default ProjectCard;
