import React, { useState } from 'react';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundary';
import Register from '../components/Register/Register';
import Signin from '../components/Signin/Signin';
import DeckPage from './DeckPage';

const initialState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
};

function App() {
  const [route, setRoute] = useState('register');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialState);

  const loadUser = ({ id, name, email, entries, joined } = data) => {
    setUser({
      id,
      name,
      email,
      entries,
      joined
    });
  };

  const onRouteChange = (route) => {
    if (route === 'register') {
      setRoute('register');
    } else if (route === 'signin') {
      setRoute('signin');
    }
  };

  let applicationDisplay;
    switch (route) {
      case 'signin':
        applicationDisplay = (
          <Signin onRouteChange={onRouteChange} />
        );
        break;
      case 'register':
        applicationDisplay = (
          <Register
            loadUser={loadUser}
            onRouteChange={onRouteChange}
          />
        );
        break;
      case 'home':
        applicationDisplay = <DeckPage />;
        break;
      default:
        applicationDisplay = (
          <SignIn
            loadUser={loadUser}
            onRouteChange={onRouteChange}
          />
        );
    }

  return (
    <div className="App">
      <ErrorBoundry>
        {applicationDisplay}
      </ErrorBoundry>
    </div>
  )
}

export default App;
