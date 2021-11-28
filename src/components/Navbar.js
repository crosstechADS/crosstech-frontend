import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css';
import Home from '../pages/Home';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false)
    } else {
      setButton(true)
    }
  };

  useEffect(() => {
    showButton()
  }, []);

  window.addEventListener('resize', showButton);

    return (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                CROSSTECH
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                  <Link to="/home" path="/home" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/exercicios" className="nav-links" onClick={closeMobileMenu}>
                    Exercicios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/treino" className="nav-links" onClick={closeMobileMenu}>
                    Treinos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-links-mobile" onClick={closeMobileMenu}>
                    Sair
                  </Link>
                </li>
              </ul>
              {button && <Button buttonStyle='btn--outline'>Sair</Button>}
            </div>
          </nav>
        </>
    )
}

export default Navbar
