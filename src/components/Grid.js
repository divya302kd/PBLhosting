import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const Grid = (props) => {

    const fetchProjects = async (projectId, actionTaken) => {
        try {
            const response = await fetch(`/project/update/${projectId}/${actionTaken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                alert(`${data?.status} ` + data.title)
                //setProjects(data);
                props.fetchProjects();
            } else {
                console.error('Error fetching data:', response.statusText);
                //navigate('/')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    let data = [{
        title: 'Test',
        description: 'Test',
        privacy: 'public',
        contactNumber: '',
        technologyUsed: '',
        startDate: '',
        endDate: '',
        status: ''
    }];

    useEffect(() => {
        if(props.showAction === 'true') {
            initialheaders.push('Action');
            setHeaders(initialheaders)
        }
    }, []);

    const onEdit = (e)=> {
        console.log(e);
        fetchProjects(e.target?.parentElement?.parentElement.id, e?.target?.title)
    }
    const initialheaders = ['#','Title', 'Description', 'Privacy', 'Contact Number', 'Tech Used', 'Start Date', 'End Date', 'Status']
    const [headers, setHeaders] = useState(initialheaders);

    const keys = Object.keys(data[0]);

    return (

        <>
            <Table hover responsive>

                <thead>
                <tr className="btn-primary">

                    {
                        headers.map((key, index) => (
                            <th id={index}> {key}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>

                {
                    props.data.map((project, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            {
                                keys.map((key) => (
                                    <td> { project[key]}</td>

                                ))
                               // ()

                            }
                            <td hidden={!(props.showAction === 'true')} id={project.projectId}>
                                <Button onClick={onEdit} name="Approved" variant="link"><i title="Approved" className="fa fa-check fa-2x"></i></Button>
                                <Button onClick={onEdit} name = "Rejected" variant="link" style={{color: "red"}} ><i  title= "Rejected" className="fa fa-close fa-2x"></i></Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </>
    )

}

export default Grid;
