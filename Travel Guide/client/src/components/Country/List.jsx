import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SearchCountry from './SearchCountry'; // Import the new component

function List() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [searchedCountry, setSearchedCountry] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/countries')
            .then(res => setCountries(res.data))
            .catch(err => console.error(err));
    }, []);

    const deleteC = (id) => {
        axios.delete('http://localhost:8000/api/country/delete/' + id)
            .then(res => setCountries(countries.filter(c => c._id !== id)))
            .catch(err => console.error(err));
    };

    const handleSearch = (countryName) => {
        const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
        if (country) {
            setSearchedCountry(country);
        } else {
            setSearchedCountry(null);
            alert('Country not found.');
        }
    };

    return (
        <div className='container mt-5'>
            <h1>Countries List</h1>
            <button onClick={() => navigate('/add')} className='btn btn-primary'>Add new Country</button>
            <SearchCountry onSearch={handleSearch} /> {/* Add Search Component */}

            {searchedCountry ? (
                <div className="card mt-3">
                    <h2>{searchedCountry.name}</h2>
                    <img src={searchedCountry.flag} alt={searchedCountry.name} height={100} />
                    <p>Capital: {searchedCountry.capital || 'Not available'}</p>
                </div>
            ) : (
                <table className='table table-sm table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Flag</th>
                            <th>Independent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(c => (
                            <tr key={c._id}>
                                <td>
                                    <Link to={`/c/${c._id}`}>{c.name}</Link>
                                </td>
                                <td><img src={c.flag} alt='' height={50} /></td>
                                <td>{c.independent ? "Yes" : "No"}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => navigate(`/c/edit/${c._id}`)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteC(c._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default List;
