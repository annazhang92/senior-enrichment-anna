import React, { Component } from 'react';
import store,{updateSchool,updatePuppy}  from './store';
import { connect } from 'react-redux';


class SchoolUpdates extends Component{
    constructor({school,id,thisSchoolPuppies,notThisSchoolPuppies}){
    super();
      this.state = {
          name:school ? school.name : '',
          location:school? school.location: ''
      };

      this.onSave=this.onSave.bind(this)
      this.onChange=this.onChange.bind(this)
      // this.handleChange=this.handleChange.bind(this)
      // this.addStudent=this.addStudent.bind(this)
    }


    // onChangeName(ev){
    //     this.setState({ input: ev.target.value });
    //     console.log(this.state.input)
    // }

    onSave(ev){
        ev.preventDefault();
        const school = { id:this.props.id, name: this.state.name, location: this.state.location};
        this.props.updateSchool(this.props.id, school)
      }

    onChange(ev){
      const nameKey = ev.target.name;
      this.setState({ [nameKey]: ev.target.value });
    }
    // addStudent(ev){
    //   console.log(ev.target.key)

    // }

    // handleChange (ev){
    //   console.log(ev.target.value)
    // }

    // handleSubmit(){
    // this.props.updatePuppy(ev.target.name, {schoolId:this.props.id})
    // }

    render(){
        const { onChangeName, onSave, onChange} = this;
        const { name,location } = this.state;
        const otherPuppiesList = this.props.notThisSchoolPuppies.map(puppy=><option key={puppy.id} value={puppy.id}>{puppy.name}</option>)
        const PuppiesList = this.props.thisSchoolPuppies.map(puppy=><li key={puppy.id} value={puppy.name}>{puppy.name}</li>)
        return (
          <div>
          <h2>School Infor</h2>
          <form onSubmit={ onSave }>
            <div><p>Name</p><input name = 'name' value={ name } onChange={ onChange }/></div>
            <div><p>Location</p><input name ='location' value={ location } onChange={ onChange }/></div>
            <button>Save</button>
          </form>
          

          {this.props.school&&
          <div>
          <h2>Puppies in this School</h2>
          <ul>
          {PuppiesList}
          </ul>
          <select onChange={(ev)=>this.props.updatePuppy(ev.target.value, {schoolId:this.props.id})}>
          <option>None</option>
          {otherPuppiesList}
          </select>
          </div>
          }

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
          updateSchool: (id,school)=> dispatch(updateSchool(id,school, history)),
          updatePuppy:(id,puppy)=>dispatch(updatePuppy(id,puppy, history)),
        };
      };
      
    export default connect(mapStateToProps,mapDispatchToProps)(SchoolUpdates);