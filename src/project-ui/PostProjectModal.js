import {Button, Modal} from "react-bootstrap";
import PostProjectForm from "./PostProjectForm";
import ProfileForm from "./ProfileForm";

const GenericModal = (props) => {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.type === 'postProject' ? <PostProjectForm close={props.onHide}></PostProjectForm>
                            : <ProfileForm close={props.onHide}></ProfileForm>
                    }

                </Modal.Body>
            </Modal>
        </>
    )

}


export default GenericModal;
