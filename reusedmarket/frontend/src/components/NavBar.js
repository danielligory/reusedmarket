import React from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

function NavBar() {
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
        <div className='search-bar'>
          <input type='text' placeholder ='Search'/>
        </div>
        <div className='user-actions'>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to='/register'>
            <button>Register</button>
          </Link>
          <button type='button'>Basket</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;