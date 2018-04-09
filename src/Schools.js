import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{deleteSchool} from './store';
import { connect } from 'react-redux';

const Schools = ({schools,deleteSchool})=> {

      const SchoolsList = schools.map( school => {

        return (
          <li key={ school.id }>
            <Link to={`/schools/${school.id}`}>
              { school.name }
            </Link>
            <p>There are puppies</p>
            <Link to={`/updateschools/${school.id}`}><button>Edit</button></Link>
            <button onClick={()=>deleteSchool(school.id)}>Delete</button>
          </li>
        );
      })

      return (
        <div>
        <Link to={`/createschool`}>Add A School</Link>
        <ul>
        {SchoolsList}
        </ul>
        </div>
      );
  }
  
  const mapStateToProps = ({ schools })=> {
    return {
      schools
    };
  };

  const mapDispatchToProps = (dispatch, { history })=> {
    return {
      deleteSchool: (schoolid)=> dispatch(deleteSchool(schoolid, history)),
    };
  };
  


  export default connect(mapStateToProps,mapDispatchToProps)(Schools);

