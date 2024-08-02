// src/components/JsonInput.js
import React, { useState } from 'react';
import axios from 'axios';

const JsonInput = ({ onResponse }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedJson = JSON.parse(jsonInput);
            const response = await axios.post('YOUR_API_ENDPOINT', parsedJson);
            onResponse(response.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON format');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON here'
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default JsonInput;

// src/components/ResponseDisplay.js
import React, { useState } from 'react';

const ResponseDisplay = ({ data }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!data) return null;

        const filteredData = {
            alphabets: selectedOptions.includes('Alphabets') ? data.alphabets : [],
            numbers: selectedOptions.includes('Numbers') ? data.numbers : [],
        };

        return (
            <div className="response">
                <h3>Response:</h3>
                <p>Alphabets: {filteredData.alphabets.join(', ')}</p>
                <p>Numbers: {filteredData.numbers.join(', ')}</p>
            </div>
        );
    };

    return (
        <div>
            <select multiple onChange={handleSelectChange}>
                <option value='Alphabets'>Alphabets</option>
                <option value='Numbers'>Numbers</option>
                <option value='Highest alphabet'>Highest alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
};

export default ResponseDisplay;


// src/App.js
import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

const App = () => {
    const [responseData, setResponseData] = useState(null);

    return (
        <div className="container">
            <h1>Your Roll Number</h1>
            <JsonInput onResponse={setResponseData} />
            {responseData && <ResponseDisplay data={responseData} />}
        </div>
    );
};

export default App;