import { useState, useContext } from 'react';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

import { ExamContext } from '../App';

import NewQuestionOptionModal from '../utils/modals/newQuestionOptionModal';

const MultipleChoiceQuestionForm = (props) => {

    const [formData, setFormData] = useState({
        question: '',
        optionType: '',
        option: '',
        questionMark: 0,
        // optionsList: []
    });
    const [optionModal, setOptionModal] = useState(false);
    const [optionsList, setOptionsList] = useState([]);

    const { alert, handleAlert } = useContext(ExamContext)

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleOptionModal = (show, optionType) => {
        if (show) {
            console.log(optionType)
            if (optionType === '') {
                handleAlert(true, 'You\'ve got to select an option type', 'danger');
                setOptionModal(false)
            } else {
                setOptionModal(prev => !prev);

                // setOptionModal(show);
            }
        }
    }

    const addNewOption = () => {
        setFormData(prev => ({...prev, option: ''}));
        const optionIndex = optionsList.length + 1;
        optionsList.push({key: `option${optionIndex}`, value: formData.option, answer: false})
        setOptionsList(optionsList);
    }
    console.log(optionsList);
    console.log(formData);

    const handleCorrectAnswer = (optionType, optionIndex) => {
        if (optionType === 'single') {
            optionsList.forEach((option, index) => {
                if (optionIndex === index) {
                    option.answer = true;
                    // setOptionsList(prev => ([
                    //     ...prev,
                    //     optionsList
                    // ]))
                } else {
                    option.answer = false;
                }
            })
        } else {
            optionsList.forEach((option, index) => {
				if (optionIndex === index)
					if (option.answer) option.answer = false;
					else option.answer = true;
			});
        }
        setOptionsList(optionsList)
        console.log('updaetd')

    }

    return (
        <>
            <Form onSubmit={ (event) => {
                event.preventDefault();
                props.handleSubmit(formData, optionsList)
                console.log('hjsdu')
            }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="What is?"
                        name='question' value={formData.question} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Option Type</Form.Label>
                    <Form.Select aria-label="Default select example" name='optionType' value={formData.optionType} onChange={handleChange} >
                        <option></option>
                        <option value='single'>Single</option>
                        <option value='multiple'>Multiple</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" onClick={() => handleOptionModal(true, formData.optionType)}>
                    Add Option
                </Button>
            


                <div>{optionsList.map((option, index) => (
                    formData.optionType === 'single' ? (
                        // <// RADIO><
                        <Form.Check
                            inline
                            label={option.value}
                            name="group1"
                            type='radio'
                            id={`inline-}-1`}
                            onClick={() => handleCorrectAnswer(formData.optionType, index)}
                        />
                    ) : (
                        // <CHECKBOX>
                        <Form.Check 
                            type='checkbox'
                            id={`default-`}
                            label={option.value}
                            onClick={() => handleCorrectAnswer(formData.optionType, index)}
                        />
                    )
                ))}</div>


                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Options</th>
                            <th>Correct Answer</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionsList.map((option, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{option.value} </td>
                                <td>
                                    {formData.optionType === 'single' ? (
                                        // <// RADIO><
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type='radio'
                                            id={`inline-}-1`}
                                            onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                        />
                                    ) : (
                                        // <CHECKBOX>
                                        <Form.Check 
                                            type='checkbox'
                                            id={`default-`}
                                            onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                        />
                                    )}
                                </td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className='d-flex justify-content-end'>
					<Button
						variant='outlined'
						className='bg-dark text-white mt-3'
						type='submit'
						size='large'
					>
						Create
					</Button>
				</div>

                <NewQuestionOptionModal
                    show={optionModal}
                    close={handleOptionModal}
                    formData={formData}
                    handleChange={handleChange}
                    addNewOption={addNewOption}
                />

            </Form>


            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </>
    )
}

export default MultipleChoiceQuestionForm;