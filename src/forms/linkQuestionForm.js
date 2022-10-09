import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const LinkQuestionForm = () => {

    const [link, setLink] = useState('');
    return (
        <>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Link to Question</Form.Label>
                    <Form.Control
                        type="link"
                        placeholder="https://......"
                        name='link' value={link} onChange={(event) => setLink(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Link to Question</Form.Label>
                    <Form.Control
                        type="attachment"
                        placeholder="What is?"
                        name='link' value={link} onChange={(event) => setLink(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" >
                    Add Option
                </Button>
            </Form>
        </>
    )
}

export default LinkQuestionForm