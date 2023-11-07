import React from 'react';

function Header() {
  return (
    <header>
        <h1>ReUsedMarket</h1>
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/profile'>Profile</a></li>
            <li><a href='/gaming'>Gaming</a></li>
            <li><a href='/phone'>Phone</a></li>
            <li><a href='/electronics'>Electronics</a></li>
            <li><a href='/about'>About us</a></li>
            <li><a href='/cart'>Cart</a></li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;