import React from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <div className ='navbar-container'>
        <div className = 'logo'>
          <a href='/'>ReUsedMarket</a>
        </div>
        <div className='nav-links'>
          <ul>
            <li><Link to='/gaming'>Gaming</Link></li>
            <li><Link to='/phone'>Phone</Link></li>
            <li><Link to='/electronics'>Electronics</Link></li>
            <li><Link to='/about'>About Us</Link></li>
          </ul>
        </div>
        <div className='search-bar'>
          <input type='text' placeholder ='Search'/>
        </div>
        <div className='user-actions'>
          <button type ='button'>Login</button>
          <button type ='button'>Basket</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;