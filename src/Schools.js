import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{deleteSchool} from './store';
import { connect } from 'react-redux';

const Schools = ({schools,deleteSchool})=> {

      const SchoolsList = schools.map( school => {

        return (
          <div className="col-sm-6 col-md-6 col-lg-6" key={ school.id }>
          <br></br>
            <img id ='schoolimage' className="img-responsive" src={school.imgUrl}></img>
            <br></br>
            <Link to={`/schools/${school.id}`}>
            <button className="btn btn-primary">
              { school.name }
            </button>
            </Link>
            <p><strong>Location:</strong> { school.location }</p>
            {/* <Link to={`/updateschools/${school.id}`}><button className="btn btn-warning">Edit</button></Link>
            <button className="btn btn-danger" onClick={()=>deleteSchool(school.id)}>Delete</button> */}
          </div>
        );
      })

      return (
        <div>
        <Link to={`/createschool`}><button className="btn btn-primary">Add A School</button></Link>
        <div className="container">
        {SchoolsList}
        </div>
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

