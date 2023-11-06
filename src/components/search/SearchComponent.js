import {Badge, Form, InputGroup, ListGroup} from "react-bootstrap";
import XHRUtil from "../XHRUtil";
import React, { useState} from "react";

const SearchComponent = (props) => {

    const [data, setData] = useState([]);

   const  handleChange =  (e) => {
       const {name, value} = e.target;
        if(value.length > 0) {
            let request = XHRUtil.getDataFromApiWithoutAuth(`/project/searchProjects?title=${value}`);

            request.then((res) => {
                setData(res);
            });
        } else if(value === "") {
            setData([]);
        }
    }

    return (
        <div className="p-3">
            <h3 className="text-center nwthemecolor"> Search Projects </h3>
            <InputGroup className="mb-3" size="lg">
                <Form.Control
                    type="text" onChange={handleChange} />
                <InputGroup.Text><i className="fa fa-search nwthemecolor"></i></InputGroup.Text>
            </InputGroup>
            <ListGroup as="ol">
                {
                    data?.map((project) => (
                        <ListGroup.Item action variant="light"
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{project.title}</div>
                                {project.description}
                            </div>
                            {
                                project?.categories?.map((tech,badgeIndex) => (
                                <Badge key={'badge-' + badgeIndex} pill bg="success">{tech}</Badge>
                                ))
                            }
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    )


}

export default SearchComponent;
