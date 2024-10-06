import React, { useState } from 'react';
import axios from 'axios';

const SearchCountry = ({ onSearch }) => {
    const [countryName, setCountryName] = useState('');
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (countryName.trim() === '') {
            setError('Please enter a country name.');
            return;
        }
        setError('');
        onSearch(countryName);
    };

    return (
        <div className="search-country">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    placeholder="Search for a country..."
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default SearchCountry;
