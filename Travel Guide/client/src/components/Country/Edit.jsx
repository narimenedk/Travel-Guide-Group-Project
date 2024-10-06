import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState("")
    const [flag, setFlag] = useState("")
    const [independent, setIndependent] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/country/' + id)
            .then(res => {
                setName(res.data.name)
                setFlag(res.data.flag)
                setIndependent(res.data.independent)
            })
            .catch(err => {
                console.error(err)
            })
    }, [id])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8000/api/country/update/' + id, { name, flag, independent })
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
            <h1>Edit country</h1>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="flag" className="form-label">Flag:</label>
                    <input type="text" className="form-control" id="flag" name="flag" value={flag} onChange={(e) => setFlag(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="independent" className="form-label">Independent:</label>
                    <input type="checkbox" className="form-check-input" id="independent" name="independent" checked={independent} onChange={(e) => setIndependent(e.target.checked)} />
                </div>
                <div className="mb-3">
                    {errors.map((err,index) => (
                        <p key={index} className="text-danger">{err}</p>
                    ))}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;