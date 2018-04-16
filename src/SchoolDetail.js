import React, { Component } from 'react';
import store,{updatePuppy,deleteSchool}  from './store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SchoolDetail extends Component{
      constructor({school,id,thisSchoolPuppies,notThisSchoolPuppies}){
      super();
      }

      render(){
      const otherPuppiesList = this.props.notThisSchoolPuppies.map(puppy=><option key={puppy.id} value={puppy.id}>{puppy.name}</option>)
      const PuppiesList = this.props.thisSchoolPuppies.map(puppy=><div className="col-sm-4 col-md-4 col-lg-4" key={puppy.id} value={puppy.name}><Link to={`/puppies/${puppy.id}`}><button className="btn btn-primary">{puppy.name}</button></Link><p></p><img id ='puppyimage' className="img-responsive" src={puppy.imgUrl }></img><br></br></div>)
          return (
            <div className='container'>
            {this.props.school &&
            <div>
            <h2>{this.props.school.name}</h2>
            <div>
            <Link to={`/updateschools/${this.props.school.id}`}><button className="btn btn-warning">Edit</button></Link>
            <button className="btn btn-danger" onClick={()=>this.props.deleteSchool(this.props.school.id)}>Delete</button>
            </div>
            <br></br>
            <img id='schoolimagedetail' className="img-responsive" src={this.props.school.imgUrl}></img>
            <p><strong>Location:</strong> {this.props.school.location}</p>
            <p><strong>Description:</strong> {this.props.school.description}</p>
            </div>
            }

            <p><strong>Puppies in this School</strong></p>
            {/* <select className='btn btn-primary' onChange={(ev)=>this.props.updatePuppy(ev.target.value, {schoolId:this.props.id})}>
            <option>Add Puppy</option>
            {otherPuppiesList}
            </select> */}
            <div className='container'>
            {this.props.thisSchoolPuppies.length>0 ?  PuppiesList: <p className='alert alert-info'>There is no puppy in this school</p>}
            </div>
            </div>
          );
      }
}
  

    const mapStateToProps = ({ schools,puppies }, { id })=> {
        const school = schools.find( school => school.id === id);
        const thisSchoolPuppies = puppies.filter(puppy=>puppy.schoolId===id)
        const notThisSchoolPuppies= puppies.filter(puppy=>puppy.schoolId!==id)
        return {
          school,
          thisSchoolPuppies,
          notThisSchoolPuppies
        };
      }
  

    const mapDispatchToProps = (dispatch, { history })=> {
        return {
          updatePuppy:(id,puppy)=>dispatch(updatePuppy(id,puppy, history)),
          deleteSchool: (schoolid)=> dispatch(deleteSchool(schoolid, history)),
        };
      };

    export default connect(mapStateToProps,mapDispatchToProps)(SchoolDetail);