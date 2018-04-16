import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store,{deletePuppy} from './store';
import { connect } from 'react-redux';

const Puppies = ({puppies,deletePuppy})=> {

      const PuppiesList = puppies.map( puppy => {
        return (
          <div className="col-sm-4 col-md-4 col-lg-4" key={ puppy.id }>
          <br></br>
          <img id ='puppyimage' className="img-responsive" src={puppy.imgUrl }></img>
          <br></br>
            <Link to={`/puppies/${puppy.id}`}>
            <button className="btn btn-primary">
              { puppy.name }
            </button>
            </Link>
            <br></br>
            {/* <Link to={`/updatepuppies/${puppy.id}`}><button className="btn btn-warning">Edit</button></Link>
            <button className="btn btn-danger"onClick={()=>deletePuppy(puppy.id)}>Delete</button> */}
          </div>
        );
      })

      return (
        <div>
        <Link to={`/createpuppy`}><button className="btn btn-primary">Add A Puppy</button></Link>
        <div className="container">
        {PuppiesList}
        </div>
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
