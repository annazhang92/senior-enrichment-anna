import React, { Component } from 'react';
import store,{updateSchool,updatePuppy}  from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class SchoolUpdates extends Component{
    constructor({school,id,thisSchoolPuppies,notThisSchoolPuppies}){
    super();
      this.state = {
          name:school ? school.name : '',
          location:school? school.location: '',
          description:school? school.description: '',
          imgUrl:school? school.imgUrl: '',
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
        const school = { id:this.props.id, name: this.state.name, location: this.state.location, description:this.state.description, imgUrl:this.state.imgUrl};
        this.props.updateSchool(this.props.id, school)
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
        name: nextProps.school ? nextProps.school.name : '',
        location: nextProps.school ? nextProps.school.location : '',
        description: nextProps.school ? nextProps.school.description : ''
      });
    }

    render(){
        const { onChangeName, onSave, onChange} = this;
        const { name,location,description,imgUrl } = this.state;
        const otherPuppiesList = this.props.notThisSchoolPuppies.map(puppy=><option key={puppy.id} value={puppy.id}>{puppy.name}</option>)
        const PuppiesList = this.props.thisSchoolPuppies.map(puppy=><div className="col-sm-4 col-md-4 col-lg-4" key={puppy.id} value={puppy.name}><p>{puppy.name}</p><img id ='puppyimage' className="img-responsive" src={puppy.imgUrl }></img></div>)
        return (
          <div>
          <h2>School Infor</h2>
          <form onSubmit={ onSave}>
            <div><p><strong>Name</strong></p><input className="form-control" name = 'name' value={ name } onChange={ onChange }/></div>
            <br></br>
            <div><p><strong>Location</strong></p><input className="form-control" name ='location' value={ location } onChange={ onChange }/></div>
            <br></br>
            <div><p><strong>Image Url</strong></p><input className="form-control" name ='imgUrl' value={ imgUrl } onChange={ onChange }/></div>
            <br></br>
            <div><p><strong>Description</strong></p><textarea className="form-control" row ='3' name ='description' value={ description } onChange={ onChange }/></div>
            <br></br>
            <button className='btn btn-warning'>Save</button>
            <Link to={`/schools/${this.props.id}`}><button className='btn btn-primary'>Back</button></Link>
          </form>
          {this.state.infor && <p className='alert alert-info'>{this.state.infor}</p>}

          {this.props.school&&
          <div>
          <p><strong>Puppies in this School</strong></p>
          <select className='btn btn-primary' onChange={(ev)=>this.props.updatePuppy(ev.target.value, {schoolId:this.props.id})}>
          <option>Add Puppy</option>
          {otherPuppiesList}
          </select>
          <div className='container'>
          {PuppiesList}
          </div>
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