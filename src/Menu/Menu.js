
import React from 'react';

import {
    Link
  } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu" role="navigation" aria-label="Main Menu" itemScope itemType="https://schema.org/SiteNavigationElement">
        <ul>
            <li><Link itemProp="url" to="/" aria-label="Homepage">Homepage</Link></li>
            <li><Link itemProp="url" to="/about" aria-label="About this page">About</Link></li>
            <li><Link itemProp="url" to="/login" aria-label="Login page">Login</Link></li>
            <li><Link itemProp="url" to="https://google.com" aria-label="Google search engine">Google</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;