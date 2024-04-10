import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

function NavBar({ serverBaseUrl }) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };


  return (
    <nav>
      <div className ='navbar-container'>
        <div className = 'logo'>
          <Link to='/'>ReUsedMarket</Link>
        </div>
        <div className='nav-links'>
          <ul>
            <li>
              <Link to='/gaming'>Gaming</Link>
            </li>
            <li>
              <Link to='/phone'>Phone</Link>
            </li>
            <li>
              <Link to='/electronics'>Electronics</Link>
            </li>
            <li>
              <Link to='/about'>About us</Link>
            </li>
          </ul>
        </div>
        <div className='user-actions'>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to='/register'>
            <button>Register</button>
          </Link>
          <Link to='/basket'>
            <button type='button'>Basket</button>
          </Link>
          <button onClick = {handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
