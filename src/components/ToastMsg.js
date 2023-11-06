import {Toast} from "react-bootstrap";

const ToastMsg = (props) => {
    return (
        <Toast  {...props} autohide>
            <Toast.Header>
                <strong className="mr-auto">{props.header}</strong>
            </Toast.Header>
            <Toast.Body>{props.body}</Toast.Body>
        </Toast>
    )
}

export default ToastMsg;
