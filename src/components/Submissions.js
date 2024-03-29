// Submissions.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Submissions = () => {

    
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('https://editor-backend-tjck.onrender.com/submissions');
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    return (
        <div className="submissions-container">
            <h2>Submissions</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Language</th>
                            <th>Stdin</th>
                            <th>Code</th>
                            <th>Timestamp</th>
                            <th>Stdout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(({ username, language, stdin, code, timestamp, output }, index) => (
                            <tr key={index}>
                                <td>{username}</td>
                                <td>{language}</td>
                                <td>{stdin}</td>
                                <td>
                                    <div className="code-editor">
                                        <pre><code>{code.substring(0, 100)}</code></pre>
                                    </div>
                                </td>
                                <td>{timestamp}</td>
                                <td>{output}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Submissions;
