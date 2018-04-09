import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ()=> {
    return (
      <ul>
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
    );
  };
export default Nav;
