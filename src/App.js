import React from 'react';
import logo from './logo.svg';
import './App.css';
import MobileForm from './components/MobileForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click on the button to open the form.
        </p>
        <MobileForm></MobileForm>
      </header>
      <div>
      </div>

    </div>
  );
}

export default App;
