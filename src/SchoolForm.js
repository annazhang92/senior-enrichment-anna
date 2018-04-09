import React, { Component } from 'react';
import store,{saveSchool}  from './store';
import { connect } from 'react-redux';


class SchoolForm extends Component{
    constructor(){
    super();
      this.state = {
          name:'',
          location:''
      };

      this.onSave=this.onSave.bind(this)
      this.onChange=this.onChange.bind(this)
    }


    // onChangeName(ev){
    //     this.setState({ input: ev.target.value });
    //     console.log(this.state.input)
    // }

    onSave(ev){
        ev.preventDefault();
        const school = { name: this.state.name, location: this.state.location};
        this.props.saveSchool(school)
      }

    onChange(ev){
      const nameKey = ev.target.name;
      this.setState({ [nameKey]: ev.target.value });
      console.log(this.state);
    }

    render(){
        const { onChangeName, onSave, onChange} = this;
        const { name,location } = this.state;
        return (
          <div>
          <h2>Enter a School Name</h2>
          <form onSubmit={ onSave }>
            <div><p>Name</p><input name = 'name' value={ name } onChange={ onChange }/></div>
            <div><p>Location</p><input name ='location' value={ location } onChange={ onChange }/></div>
            <button>Save</button>
          </form>

          
          </div>
        );
    }
}

    // const mapStateToProps = ({ users }, { id })=> {
    //     const user = users.find( user => user.id === id);
    //     return {
    //       user
    //     };
    //   }
      
    const mapDispatchToProps = (dispatch, { history })=> {
        return {
          saveSchool: (school)=> dispatch(saveSchool(school, history)),
        };
      };
      
    export default connect(null,mapDispatchToProps)(SchoolForm);