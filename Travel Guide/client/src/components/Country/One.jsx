import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function One() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [c, setC] = useState({});

    useEffect(()=> {
        axios.get("http://localhost:8000/api/country/" + id)
        .then(res=>setC(res.data))
        .catch(err=>console.error(err))
    }, [id])

    return (
        <div className="container mt-5">
            <div className="card">
                <h1>{c.name}</h1>
                <div className="card-body">
                    <p><img src={c.flag} alt="" height={100}/></p>
                    <p>Independent: {c.independent ? "Yes" : "No"} </p>
                </div>
            </div>
            <button className="btn btn-secondary" onClick={()=>navigate("/")}>Home</button>
        </div>
    )
}

export default One; 