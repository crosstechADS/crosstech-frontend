import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css';
import Home from '../pages/Home';

function Navbar({ perfil }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  const logoutBtn = () => {
    closeMobileMenu();
    localStorage.clear();
    window.location.pathname = '/';
  }

  useEffect(() => {
    showButton()
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {perfil == 'aluno' &&
            <Link to='/alunohome' className='navbar-logo' onClick={closeMobileMenu}>
              CROSSTECH
            </Link>
          }
          {perfil == 'recepcionista' &&
            <Link to='/recepcaohome' className='navbar-logo' onClick={closeMobileMenu}>
              CROSSTECH
            </Link>
          }
          {perfil !== 'aluno' &&
            <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
              CROSSTECH
            </Link>
          }

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className="nav-item">
                  <Link to="/home" path="/home" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li> */}
            {perfil !== "aluno" &&
              <li className="nav-item">
                <Link to="/alunos" className="nav-links" onClick={closeMobileMenu}>
                  Alunos
                </Link>
              </li>}
            {perfil == "professor" &&
              <li className="nav-item">
                <Link to="/exercicios" className="nav-links" onClick={closeMobileMenu}>
                  Exercicios
                </Link>
              </li>
            }
            {perfil == "professor" &&
              <li className="nav-item">
                <Link to="/treinos" className="nav-links" onClick={closeMobileMenu}>
                  Treinos
                </Link>
              </li>
            }
            <li className="nav-item">
              <Link to="/" className="nav-links-mobile" onClick={logoutBtn}>
                Sair
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' onClick={logoutBtn}>Sair</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
