import { Modal, Form, Button } from 'react-bootstrap';


const NewQuestionOptionModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3">
                        <Form.Label>Option</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Efy"
                            name='option' value={props.formData.option} 
                            onChange={props.handleChange}
                        />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={props.addNewOption} >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewQuestionOptionModal;