// Form.js

import React, { useState } from 'react';
import axios from 'axios';


const Form = () => { 

    

    const [username, setUsername] = useState('');
    const [language, setLanguage] = useState('');
    const [stdin, setStdin] = useState('');
    const [code, setCode] = useState('');
    // const [output, setOutput] = useState('');

    function updateCodeLines() {
        const codeTextArea = document.getElementById('code');
        const codeLines = document.querySelector('.code-lines');

        const lines = codeTextArea.value.split('\n').length;
        codeLines.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Submit code to backend for execution
            const data=await axios.post('https://editor-backend-tjck.onrender.com/execute', { code, language });

            console.log("token :",data.data);
    
            // Retrieve output from the backend
            const response = await axios.post('https://editor-backend-tjck.onrender.com/output',{token:data.data});

            console.log("output :",response.data);
    
            // Update code output state with the retrieved output
            // setOutput(response.data);

            let output=response.data;
    
            // Submit code details for storage
            await axios.post('https://editor-backend-tjck.onrender.com/submit', { username, language, stdin, code, output });
    
            // Clear input fields and output state
            setUsername('');
            setLanguage('');
            setStdin('');
            setCode('');
           
            
            // Display success message
            alert('Submission successful');
        } catch (error) {
            console.error('Error submitting code:', error);
            alert('Error submitting code');
        }
    };
    

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className='input-fields'>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input" placeholder="Username" required />
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-select" required>
                    <option value="">Select Language</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                </select>
                <input type="text" value={stdin} onChange={(e) => setStdin(e.target.value)} className="form-input" placeholder="Stdin" required />
                </div>
                <div className="code-editor">
                    <div className="code-lines"></div>
                    <textarea
                        id="code"
                        className="code"
                        spellCheck="false"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onInput={updateCodeLines}
                        onScroll={updateCodeLines}
                    ></textarea>
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );

    
}

export default Form;
