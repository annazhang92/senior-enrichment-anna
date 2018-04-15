import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{deletePuppy} from './store';
import { connect } from 'react-redux';

const Puppies = ({puppies,deletePuppy})=> {

      const PuppiesList = puppies.map( puppy => {
        return (
          <li key={ puppy.id }>
            <Link to={`/puppies/${puppy.id}`}>
              { puppy.name }
            </Link>
            <Link to={`/updatepuppies/${puppy.id}`}><button>Edit</button></Link>
            <button onClick={()=>deletePuppy(puppy.id)}>Delete</button>
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
  


  const mapDispatchToProps = (dispatch, { history })=> {
    return {
      deletePuppy: (puppyid)=> dispatch(deletePuppy(puppyid, history)),
    };
  };
  


  export default connect(mapStateToProps,mapDispatchToProps)(Puppies);
