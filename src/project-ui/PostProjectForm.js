import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {InputLabel, MenuItem, OutlinedInput, Select} from "@material-ui/core";
import Categories from "./Categories";

const PostProjectForm = (props) => {
    const initialFormData = {
        title: '',
        description: '',
        contactNumber: '',
        technologyUsed: '',
        startDate: '',
        endDate: '',
        privacy: '',
        categories: []
    };

    const navigate = useNavigate();


    const [formData, setFormData] = useState(initialFormData);

    const [validated, setValidated] = useState(false);

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

        if (form.checkValidity()) {
            try {
                const response = await fetch(`/project/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        contactNumber: formData.contactNumber,
                        technologyUsed: formData.technologyUsed,
                        startDate: formData.startDate,
                        endDate: formData.endDate,
                        privacy: formData.privacy,
                        categories: formData.categories
                    }),
                });

                if (response.ok) {

                    if (response) {
                        alert('Project sent to Admin for review');
                        setFormData(initialFormData);
                    } else {
                        console.error('Failed to create Project');
                        alert('Failed to create Project');
                    }
                } else {
                    const errorMessage = await response.text();
                    console.error('Failed to create Project', response.status, errorMessage);
                    alert(`Error -  ${response.status} - ${errorMessage}`);
                }
            } catch (error) {
                console.error('Failed to create Project', error);
                alert(`Error -  ${error}`);
                localStorage.clear();

            }
        }
    };


    return (
        <Container className="m-3">

            <h4 className="text-center nwthemecolor"> Post Project </h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">
                <Row>
                    <Container className="col-md-7">
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label className="text-bold">Project Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" required value={formData.title} name="title"
                                          onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label className="font-weight-bold">Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" rows={3} name="description"
                                          maxLength={50}
                                          required value={formData.description} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="startDate">
                                <Form.Label className="font-weight-bold">Start Date</Form.Label>
                                <Form.Control type="date" placeholder="mm/dd/yyyy" name="startDate" required
                                              value={formData.startDate} onChange={handleChange}/>
                                <Form.Control.Feedback type="invalid">
                                    Mandatory
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="endDate">
                                <Form.Label className="font-weight-bold">End Date</Form.Label>
                                <Form.Control type="date" placeholder="mm/dd/yyyy" name="endDate" required
                                              value={formData.endDate}
                                              onChange={handleChange}/>
                                <Form.Control.Feedback type="invalid">
                                    Mandatory
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="contactNumber" className="mb-3">
                            <Form.Label className="font-weight-bold">Contact Number</Form.Label>
                            <Form.Control type="tel" minLength="10" maxLength="10" name="contactNumber"
                                          placeholder="Contact Number"
                                          required value={formData.contactNumber} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="technologyUsed" className="mb-3">
                            <Form.Label className="font-weight-bold">Technology used</Form.Label>
                            <Form.Control as="textarea" placeholder="Technology used" name="technologyUsed" rows={3}
                                          maxLength={300}
                                          value={formData.technologyUsed} onChange={handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Privacy
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Public"
                                    name="privacy"
                                    id="Public"
                                    required
                                    value="Public"
                                    checked={formData.privacy === 'Public'}
                                    feedback="Mandatory"
                                    feedbackType="invalid"
                                    onChange={handleChange}

                                />
                                <Form.Check
                                    type="radio"
                                    label="Private"
                                    name="privacy"
                                    id="Private"
                                    value="Private"
                                    required
                                    checked={formData.privacy === 'Private'}
                                    feedback="Mandatory"
                                    feedbackType="invalid"
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Container>

                    <Container className="col-md-5">

                        <Form.Group className="mb-3" >
                            <Form.Label >Select Categories</Form.Label>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                required
                                name="categories"
                                value={formData.categories}
                                onChange={handleChange}
                                style={{width: '100%'}}
                            >
                                {Categories.categories.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Form.Control.Feedback type="invalid">
                                Mandatory
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Project files</Form.Label>
                            <Form.Control type="file" multiple/>
                        </Form.Group>
                    </Container>
                </Row>
                <Form.Group className="d-flex justify-content-end">
                    <Button variant="success" className="m-2" type="submit">Post Project</Button>
                </Form.Group>
            </Form>


        </Container>
    )
}

export default PostProjectForm;
