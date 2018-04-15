import React, { Component } from 'react';
import store,{updateSchool,updatePuppy}  from './store';
import { connect } from 'react-redux';


class PuppyUpdates extends Component{
    constructor({puppy,id}){
    super();
      this.state = {
          name:puppy ? puppy.name : '',
          gpa:puppy? puppy.gpa: ''
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
        this.props.updatePuppy(this.props.id, puppy)
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
        const { onSave, onChange} = this;
        const { name,gpa } = this.state;
      
        return (
          <div>
          <h2>Puppy Infor</h2>
          <form onSubmit={ onSave }>
            <div><p>Name</p><input name = 'name' value={ name } onChange={ onChange }/></div>
            <div><p>GPA</p><input name ='gpa' value={ gpa } onChange={ onChange }/></div>
            <button>Save</button>
          </form>
          
          </div>
        );
    }
}

    const mapStateToProps = ({ puppies }, { id })=> {
        const puppy =puppies.find( puppy => puppy.id === id);
        return {
          puppy,
        };
      }
  
    const mapDispatchToProps = (dispatch, { history })=> {
        return {
          updatePuppy:(id,puppy)=>dispatch(updatePuppy(id,puppy, history)),
        };
      };
      
    export default connect(mapStateToProps,mapDispatchToProps)(PuppyUpdates);