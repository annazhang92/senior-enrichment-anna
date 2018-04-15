import React, { Component } from 'react';
import store,{updatePuppy}  from './store';
import { connect } from 'react-redux';

const SchoolDetail = ({school,thisSchoolPuppies,notThisSchoolPuppies,id})=> {
  const otherPuppiesList = notThisSchoolPuppies.map(puppy=><option key={puppy.id} value={puppy.id}>{puppy.name}</option>)
  const PuppiesList = thisSchoolPuppies.map(puppy=><li key={puppy.id} value={puppy.name}>{puppy.name}</li>)
    
          return (
            <div>
            {school &&
            <ul>
            <li>{school.name}</li>
            <li>{school.location}</li>
            </ul>
            }

            <h2>Puppies in this School</h2>
            <ul>
            {PuppiesList}
            </ul>
            <select onChange={(ev)=>updatePuppy(ev.target.value, {schoolId:id})}>
            <option>None</option>
            {otherPuppiesList}
            </select>
            </div>
          );
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