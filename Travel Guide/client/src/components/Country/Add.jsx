import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [flag, setFlag] = useState("")
    const [independent, setIndependent] = useState(false)
    const [errors, setErrors] = useState([])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/country/new', { name, flag, independent })
            .then(res => navigate("/"))
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            })
    }

    return (
        <div className="container mt-5">
            <h1>Add  new Country:</h1>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="flag" className="form-label">Flag</label>
                    <input type="text" className="form-control" id="flag" value={flag} onChange={(e) => setFlag(e.target.value)} />
                </div>
                <div className="mb-3 form-check">
                    <label className="form-check-label" htmlFor="independent">Independent</label>
                    <input type="checkbox" className="form-check-input" id="independent" checked={independent} onChange={(e) => setIndependent(e.target.checked)} />
                </div>
                <div className="mb-3">
                    {errors.map((err, index) => (
                        <p key={index} className='text-danger'>{err}</p>
                    ))}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Add;