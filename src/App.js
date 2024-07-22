// frontend/src/App.js

import React from 'react';
import './App.css';
import BirthdayPost from './BirthdayPost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/page1" element={<BirthdayPost />} />
            <Route path="/page2" element={<BirthdayPost />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
