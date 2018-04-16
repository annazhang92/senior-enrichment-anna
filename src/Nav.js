import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=> {
    return (
      <nav className="navbar navbar-default">
      <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/schools'>Schools</Link>
        </li>
        <li>
          <Link to='/puppies'>Puppies</Link>
        </li>
      </ul>
      </div>
      </nav>
    );
  };
export default Nav;
