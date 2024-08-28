import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className={`toggle-bar toggle-bar-${theme}`} onClick={toggleTheme}>
        <div className={`slider slider-${theme}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
