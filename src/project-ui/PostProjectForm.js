import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ToastMsg from "../components/ToastMsg";

const PostProjectForm = (props) => {
    const initialFormData = {
        title: '',
        description: '',
        contactNumber: '',
        technologyUsed: '',
        startDate: '',
        endDate: '',
        privacy: 'Public',
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


        if(form.checkValidity()) {
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
                        privacy: formData.privacy
                    }),
                });

                if (response.ok) {

                    if (response) {
                        props.close();
                        alert('Project sent to Admin for review');
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
                // navigate('/');

            }
        }
    };


    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Group controlId="title">
                <Form.Label className="font-weight-bold">Project Title</Form.Label>
                <Form.Control type="text" placeholder="Title" required value={formData.title} name="title"
                              onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                    Mandatory
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label className="font-weight-bold">Description</Form.Label>
                <Form.Control as="textarea" placeholder="Description" rows={3} name="description" maxLength={250}
                              required value={formData.description} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                    Mandatory
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
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
                    <Form.Control type="date" placeholder="mm/dd/yyyy" name="endDate" required value={formData.endDate}
                                  onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Mandatory
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="contactNumber">
                <Form.Label className="font-weight-bold">Contact Number</Form.Label>
                <Form.Control type="tel" minLength="10" maxLength="10" name="contactNumber" placeholder="Contact Number"
                              required value={formData.contactNumber} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                    Mandatory
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="technologyUsed">
                <Form.Label className="font-weight-bold">Technology used</Form.Label>
                <Form.Control as="textarea" placeholder="Technology used" name="technologyUsed" rows={3} maxLength={300}
                              value={formData.technologyUsed} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                    Mandatory
                </Form.Control.Feedback>
            </Form.Group>

            <fieldset>
                <Form.Group as={Row}>
                    <Form.Label className="font-weight-bold" as="legend" column sm={2}>
                        Privacy
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Public"
                            name="privacy"
                            id="Public"
                            required
                            value={formData.privacy}
                            feedback="Mandatory"
                            onChange={handleChange}

                        />
                        <Form.Check
                            type="radio"
                            label="Private"
                            name="privacy"
                            id="Private"
                            required
                            value={formData.privacy}
                            feedback="Mandatory"
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
            </fieldset>

            <Form.Group>
                <Form.File className="font-weight-bold" id="exampleFormControlFile1" label="Upload Project files" />
            </Form.Group>

            <Form.Group as={Row} className="d-flex justify-content-end">
                <Button className="m-2" variant="danger" onClick={props.close}>Close</Button>
                <Button variant="success" className="m-2" type="submit">Post Project</Button>
            </Form.Group>
        </Form>
    )
}

export default PostProjectForm;
