import React, { Component } from 'react';
import store,{updateSchool,updatePuppy}  from './store';
import { connect } from 'react-redux';


class PuppyUpdates extends Component{
    constructor({puppy,id,thisPuppySchool,notThisPuppySchools}){
    super();
      this.state = {
          name:puppy ? puppy.name : '',
          gpa:puppy? puppy.gpa: '',
          infor:''
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
        const puppy = { id:this.props.id, name: this.state.name, gpa: this.state.gpa};
        this.props.updatePuppy(this.props.id, puppy);
        this.setState({infor:'Information has been updated'})
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
    componentWillReceiveProps(nextProps){
      this.setState({
        name: nextProps.puppy ? nextProps.puppy.name : '',
        gpa: nextProps.puppy ? nextProps.puppy.gpa : ''
      });
    }

    render(){
        const { onSave, onChange} = this;
        const { name,gpa } = this.state;
        const otherSchoolsList = this.props.notThisPuppySchools.map(school=><option key={school.id} value={school.id}>{school.name}</option>)
        const SchoolList = this.props.thisPuppySchool.map(school=><li key={school.id} value={school.name}>{school.name}</li>)
      
        return (
          <div>
          <h2>Puppy Infor</h2>
          <form onSubmit={ onSave }>
            <div><p>Name</p><input name = 'name' value={ name } onChange={ onChange }/></div>
            <div><p>GPA</p><input name ='gpa' value={ gpa } onChange={ onChange }/></div>
            <button>Save</button>
          </form>

          {this.props.puppies&&
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
          }
          
          <p>{this.state.infor}</p>
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
      
    export default connect(mapStateToProps,mapDispatchToProps)(PuppyUpdates);