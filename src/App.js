// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Form from './components/Form';
import Submissions from './components/Submissions';
import './App.css'; // Import CSS file for styling

const App = () => {
  
    return (
        <Router>
            <div className="App">
            
                <nav >
                <h1>Best4 Editor</h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/submissions">Submissions</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/submissions" element={<Submissions />} />
                        
                   
                    <Route path="/" element={ <Form />} />
                  
                </Routes>
            </div>
        </Router>
    );
}

export default App;
