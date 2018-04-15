import React, { Component } from 'react';
import store  from './store';
import { connect } from 'react-redux';

const PuppyDetail = ({puppy})=> {
    
          return (
            <div>
            {puppy &&
            <ul>
            <li>{puppy.name}</li>
            <li>{puppy.gpa}</li>
            </ul>
            }
            </div>
          );
      }
  

  const mapStateToProps = ({ puppies }, { id })=> {
    const puppy = puppies.find( puppy => puppy.id === id);
    return {
      puppy
    };
  }
  
  export default connect(mapStateToProps)(PuppyDetail);