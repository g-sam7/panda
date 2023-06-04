import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundary';
import Register from '../components/Register';
import Signin from '../components/Signin';
import Home from './Home';

const initialState = {
  id: '',
  username: '',
  email: '',
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialState);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
    });
  };

  return (
    <div className="App">
      <Router>
        <ErrorBoundry>
          <Routes>
            <Route path="/register" element={<Register loadUser={loadUser} setIsSignedIn={setIsSignedIn} />} />
            <Route path="/signin" element={<Signin loadUser={loadUser} setIsSignedIn={setIsSignedIn} />} />
            <Route path="/home" element={isSignedIn ? <Home user={user} setIsSignedIn={setIsSignedIn} /> : <Register loadUser={loadUser} setIsSignedIn={setIsSignedIn} />} />
            <Route path="/" element={<Register loadUser={loadUser} setIsSignedIn={setIsSignedIn} />} />
          </Routes>
        </ErrorBoundry>
      </Router>
    </div>
  )
}

export default App;
