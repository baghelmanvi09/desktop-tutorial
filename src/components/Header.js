
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">H</a>
      </div>
      <nav>
        <input type="text" placeholder="Search stories by..." />
        <button>Search</button>
      </nav>
    </header>
  );
};

export default Header;