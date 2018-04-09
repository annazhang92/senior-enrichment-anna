import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{createCategory} from './store';
import { connect } from 'react-redux';

const Puppies = ({puppies})=> {

      const PuppiesList = puppies.map( puppy => {
        return (
          <li key={ puppy.id }>
            <Link to={`/puppies/${puppy.id}`}>
              { puppy.name }
            </Link>
          </li>
        );
      })

      return (
        <div>
        <Link to={`/createpuppy`}>Add A Puppy</Link>
        <ul>
        {PuppiesList}
        </ul>
        </div>
      );
  }
  
  const mapStateToProps = ({ puppies })=> {
    return {
        puppies
    };
  };
  


  export default connect(mapStateToProps)(Puppies);

