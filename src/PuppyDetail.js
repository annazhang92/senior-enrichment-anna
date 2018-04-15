import React, { Component } from 'react';
import store,{updatePuppy}  from './store';
import { connect } from 'react-redux';

class PuppyDetail extends Component{
    constructor({puppy,id,thisPuppySchool,notThisPuppySchools}){
    super();
    }

    render(){
      const otherSchoolsList = this.props.notThisPuppySchools.map(school=><option key={school.id} value={school.id}>{school.name}</option>)
      const SchoolList = this.props.thisPuppySchool.map(school=><li key={school.id} value={school.name}>{school.name}</li>)
          return (
            <div>
            {this.props.puppy &&
            <ul>
            <li>{this.props.puppy.name}</li>
            <li>{this.props.puppy.gpa}</li>
            </ul>
            }

          <div>
          <h2>This Puppy's School</h2>
          <ul>
          {SchoolList}
          </ul>
          <select onChange={(ev)=>this.props.updatePuppy(this.props.id, {schoolId:ev.target.value})}>
          <option>None</option>
          {otherSchoolsList}
          </select>
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
        };
      };
      
    export default connect(mapStateToProps,mapDispatchToProps)(PuppyDetail);