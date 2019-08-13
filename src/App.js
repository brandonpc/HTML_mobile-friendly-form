import React from 'react';
import logo from './logo.svg';
import './App.css';
// import MobileForm from './components/MobileForm';
import ValidateExample from './components/ValidateExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click on the button to open the form.
        </p>
        {/* <MobileForm></MobileForm> */}
        <ValidateExample />
      </header>
      <div>
      </div>

    </div>
  );
}

export default App;
