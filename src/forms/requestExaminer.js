import { useState } from "react";


const RequestExaminerForm = (props) => {

    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        console.log(formData);
    }


    return (
        <form onSubmit={() => props.requestNewExaminer(event, formData)}>
            <input type='text' name='firstName' placeholder='First name' onChange={handleChange} value={formData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' onChange={handleChange} value={formData.lastName} />
            <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
            <input type='number' name='phoneNumber' placeholder="Phone number" onChange={handleChange} value={formData.phoneNumber} />
            <button type='submit'>Request Examiner</button>
        </form>
    )
}

export default RequestExaminerForm;