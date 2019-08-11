import React from 'react';
import logo from './logo.svg';
import './App.css';
import FormFab from './components/FormFab';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click on the button to open the form.
        </p>
        <FormFab />

      </header>
      <div>
      </div>

    </div>
  );
}

export default App;
