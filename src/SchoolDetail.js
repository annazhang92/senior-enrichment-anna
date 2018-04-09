import React, { Component } from 'react';
import store  from './store';
import { connect } from 'react-redux';

const SchoolDetail = ({school})=> {
    
          return (
            <div>
            {school &&
            <ul>
            <li>{school.name}</li>
            <li>{school.location}</li>
            </ul>
            }
            </div>
          );
      }
  

  const mapStateToProps = ({ schools }, { id })=> {
    const school = schools.find( school => school.id === id);
    return {
      school
    };
  }
  
  export default connect(mapStateToProps)(SchoolDetail);