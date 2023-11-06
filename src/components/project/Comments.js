import {Badge, Button, Card, Col, FloatingLabel, Form, Offcanvas, Row} from "react-bootstrap";
import XHRUtil from "../XHRUtil";
import React, {useEffect, useState} from "react";

const CommentProject = (props) => {

    let onExitCanvas= () =>{
        setFormData(commentData)
        setAllComments([]);
    };


    let onEnterCanvas = () =>{
        console.log(props.projectdataid)

        let getAllCommentsById = XHRUtil.getDataFromApi(`/comment/getComments/${props.projectdataid}`);
        getAllCommentsById.then((result) => {
            setAllComments(result);
        })

    }

    const commentData = {
       comment: ''
    };

    const [formData, setFormData] = useState(commentData);

    const [validated, setValidated] = useState(false);

    const [allComments, setAllComments] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }

        console.log(formData)

        if(form.checkValidity()) {
            formData.projectId = props.projectdataid;
            let postComment = XHRUtil.postDataToApi(`/comment/add`,formData);
            postComment.then(() =>{
                alert("Posted Comment");
                onEnterCanvas();
                setFormData(commentData)
            })
        }
    };


    return (
        <>
            <Offcanvas {...props} placement="end" onExit = {onExitCanvas} onShow = {onEnterCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title> <i className="fa fa-comment-o fa-lg text-success"></i> Share your thoughts </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                value={formData.comment}
                                onChange={handleChange}
                                name= "comment"
                                style={{height: '100px'}} maxLength={250} required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter comment
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-flex mt-3 justify-content-end" >
                            <Button type={"submit"} variant={"success"}> Post
                                Comment</Button>
                        </div>
                        <h6 className="mt-5"> Most Recent Comments  ({allComments?.length || 0}) </h6>
                        <hr/>
                        <Row className="g-4">
                            {allComments?.map((comment, index) => (
                                <Col key={index}>
                                    <Card border={"success"}>

                                        <Card.Body>
                                            <Card.Title>{comment.emailId}</Card.Title>
                                            <Card.Text>
                                                {comment.comment}

                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small
                                                className="text-muted">{XHRUtil.convertDate(comment.commentedDate) }</small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )

}

export default CommentProject;
