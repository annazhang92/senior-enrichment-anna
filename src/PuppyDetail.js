import React, { Component } from 'react';
import store,{updatePuppy,deletePuppy}  from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PuppyDetail extends Component{
    constructor({puppy,id,thisPuppySchool,notThisPuppySchools}){
    super();
    }

    render(){
      const otherSchoolsList = this.props.notThisPuppySchools.map(school=><option key={school.id} value={school.id}>{school.name}</option>)
      const SchoolList = this.props.thisPuppySchool.map(school=><div key={school.id} value={school.name}><Link to={`/schools/${school.id}`}><button className="btn btn-primary">{school.name}</button></Link><p></p><img id ='schoolimagedetail' className="img-responsive" src={school.imgUrl }></img></div>)
          return (
            <div className='container'>
            {this.props.puppy &&
            <div>
            <h2>{this.props.puppy.name}</h2>
            <div>
            <Link to={`/updatepuppies/${this.props.puppy.id}`}><button className="btn btn-warning">Edit</button></Link>
            <button className="btn btn-danger"onClick={()=>this.props.deletePuppy(this.props.puppy.id)}>Delete</button>
            </div>
            <br></br>
            <img id='puppyimagedetail' className="img-responsive" src={this.props.puppy.imgUrl}></img>
            <br></br>
            <p><strong>GPA</strong> {this.props.puppy.gpa}</p>
            </div>
            }

          <div>
          <p><strong>This Puppy's School</strong></p>
          {/* <select className='btn btn-primary'onChange={(ev)=>this.props.updatePuppy(this.props.id, {schoolId:ev.target.value})}>
          <option>Change School</option>
          {otherSchoolsList}
          </select> */}
          <div className='container'>
          {this.props.thisPuppySchool.length>0 ?  SchoolList: <p className='alert alert-info'>This puppy has no school</p>}
          </div>
          </div>
          </div>
          );
      }
    }
  

    const mapStateToProps = ({ schools,puppies }, { id })=> {
      
        const puppy =puppies.find( puppy => puppy.id === id);
        const puppySchoolId=puppy? (puppy.schoolId):0;
        const thisPuppySchool = schools.filter(school=>school.id===puppySchoolId)
        const notThisPuppySchools= schools.filter(school=>school.id!==puppySchoolId)
        return {
          puppy,
          thisPuppySchool,
          notThisPuppySchools,
        };
      }
  
    const mapDispatchToProps = (dispatch, { history })=> {
        return {
          updatePuppy:(id,puppy)=>dispatch(updatePuppy(id,puppy, history)),
          deletePuppy: (puppyid)=> dispatch(deletePuppy(puppyid, history)),
        };
      };
      
    export default connect(mapStateToProps,mapDispatchToProps)(PuppyDetail);