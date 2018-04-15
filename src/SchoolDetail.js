import React, { Component } from 'react';
import store,{updatePuppy}  from './store';
import { connect } from 'react-redux';

class SchoolDetail extends Component{
      constructor({school,id,thisSchoolPuppies,notThisSchoolPuppies}){
      super();
      }

      render(){
      const otherPuppiesList = this.props.notThisSchoolPuppies.map(puppy=><option key={puppy.id} value={puppy.id}>{puppy.name}</option>)
      const PuppiesList = this.props.thisSchoolPuppies.map(puppy=><li key={puppy.id} value={puppy.name}>{puppy.name}</li>)
          return (
            <div>
            {this.props.school &&
            <ul>
            <li>{this.props.school.name}</li>
            <li>{this.props.school.location}</li>
            </ul>
            }

            <h2>Puppies in this School</h2>
            <ul>
            {PuppiesList}
            </ul>
            <select onChange={(ev)=>this.props.updatePuppy(ev.target.value, {schoolId:this.props.id})}>
            
            <option>None</option>
            {otherPuppiesList}
            </select>
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
        };
      };

    export default connect(mapStateToProps,mapDispatchToProps)(SchoolDetail);