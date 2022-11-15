import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TheoryQuestionForm = () => {

    const [formData, setFormData] = useState({
        question: '',
        response: ''
    });

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="What is?"
                        name='question' value={formData.question} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Write your answer below</Form.Label>
                    
                </Form.Group>

                <Button variant="primary" >
                    Add Option
                </Button>
            </Form>
        </>
    )
}

export default TheoryQuestionForm; 
