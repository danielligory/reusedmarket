import React from 'react';

function NavBar() {
  return (
    <nav>
      <div className ='navbar-container'>
        <div className = 'logo'>
          <a href='/'>ReUsedMarket</a>
        </div>
        <div className='nav-links'>
          <ul>
            <li><a href='/gaming'>Gaming</a></li>
            <li><a href='/phone'>Phone</a></li>
            <li><a href='/electronics'>Electronics</a></li>
            <li><a href='/about'>About us</a></li>
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