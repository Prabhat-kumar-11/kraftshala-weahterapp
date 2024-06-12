import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Home from './Pages/Home';
import morning from "./assets/images/day-bg-image.jpg";
import night from "./assets/images/night-bg-image.jpg";
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundImage = `url(${darkMode ? morning : night})`;
    document.body.style.color = darkMode ? '#000' : '#fff';
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 200px',
    background: darkMode ? '#33333323' : '#282c3458',
    color: darkMode ? '#fff' : 'white',
    height: "100px",
  };

  const titleStyle = {
    fontSize: '24px',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  };

  return (
    <>
      <nav style={navbarStyle}>
        <div style={titleStyle}>Weather App</div>
        <button onClick={toggleDarkMode} style={buttonStyle}>
          {darkMode ? <FaSun  style={{color: "#dad127"}}/> : <FaMoon />}
        </button>
      </nav>
      <Home darkMode={darkMode} />
    </>
  );
}

export default App;
