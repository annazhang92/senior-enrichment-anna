import { createStore, combineReducers,applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const puppiesReducer = (state=[], action)=> {
    switch(action.type){
      case 'SET_PUPPIES':
        state = action.puppies;
        break;
        case 'CREATE_PUPPY':
        state = [...state, action.puppy];
        break;
        case 'DESTROY_PUPPY':
        state = state.filter( puppy=> puppy.id !== action.puppy.id); 
        break;
        case 'UPDATE_PUPPY':
        state = state.map(puppy=> puppy.id === action.puppy.id ? action.puppy : puppy); 
        break;
    }
    return state;
  };

  const schoolsReducer = (state=[], action)=> {
    switch(action.type){
      case 'SET_SCHOOLS':
        state = action.schools;
        break;
        case 'CREATE_SCHOOL':
        state = [...state, action.school];
        break;
        case 'DESTROY_SCHOOL':
        state = state.filter( school=> school.id !== action.school.id); 
        break;
        case 'UPDATE_SCHOOL':
        state = state.map(school=> school.id === action.school.id ? action.school : school); 
        break;
    }
    return state;
  };
  
  const reducer = combineReducers({
    puppies: puppiesReducer,
    schools: schoolsReducer
  });
  
  const store = createStore(reducer,applyMiddleware(thunk));


//   const deleteCategory = (id,history)=> {
//     return (dispatch)=> {
//     return axios.delete(`/api/categorys/${id}`) 
//     .then( result => result.data)
//     .then( () => store.dispatch({
//       type: 'DESTROY_CATEGORY',
//       category: { id  }
//     }))
//     .then( ()=> history.push('/'));
//   }
//   }

  const deleteSchool = (id,history)=> {
    return (dispatch)=> {
    return axios.delete(`/api/schools/${id}`) 
    .then( result => result.data)
    .then( () => store.dispatch({
      type: 'DESTROY_SCHOOL',
      school:{id}
    }))
  }
  }

  const deletePuppy = (id,history)=> {
    return (dispatch)=> {
    return axios.delete(`/api/puppies/${id}`) 
    .then( result => result.data)
    .then( () => store.dispatch({
      type: 'DESTROY_PUPPY',
      puppy:{id}
    }))
  }
  }


//   const saveSchool = (school,history)=> {
//     return (dispatch)=> {
//     return axios.post('/api/schools/',school)
//     .then( result => result.data)
//     .then( school => store.dispatch({
//       type: 'CREATE_SCHOOL',
//       school
//     }))
//     .then( ()=> history.push('/schools'));
//   }
// }

const updateSchool = (id,school,history)=> {
  if(id){
  return (dispatch)=> {
  return axios.put(`/api/updateschools/${id}`,school)
  .then( result => result.data)
  .then( school => store.dispatch({
    type: 'UPDATE_SCHOOL',
    school
  }))
  // .then( ()=> history.push('/schools'));
  }
  }
  return (dispatch)=> {
    return axios.post('/api/schools/',school)
    .then( result => result.data)
    .then( school => store.dispatch({
      type: 'CREATE_SCHOOL',
      school
    }))
    .then( ()=> history.push('/schools'));
  }
}

const updatePuppy = (id,puppy,history)=> {
  if(id){
  return (dispatch)=> {
  return axios.put(`/api/updatepuppies/${id}`,puppy)
  .then( result => result.data)
  .then( puppy=> store.dispatch({
    type: 'UPDATE_PUPPY',
    puppy
  }))//don't put any push history here.....
  }
  } 
  return (dispatch)=> {
    return axios.post('/api/puppies/',puppy)
    .then( result => result.data)
    .then( puppy => store.dispatch({
      type: 'CREATE_PUPPY',
      puppy
    }))
    .then( ()=> history.push('/puppies'));
  }
}

// const saveUser = (user, history)=> {
//   const { id } = user;
//   const method = id ? 'put' : 'post';
//   const action = id ? 'UPDATE_USER' : 'CREATE_USER';
//   const url = `/api/users/${ id ? id : ''}`;
//   return (dispatch)=> {
//     return axios[method](url, user)
//     .then( result => result.data)
//     .then( user => dispatch({
//       type: action,
//       user
//     }))
//     .then( ()=> history.push('/'));
//   }
// }

//   const createCategory = ()=> {
//     return (dispatch)=> {
//     return axios.post('/api/categorys/')
//     .then( result => result.data)
//     .then( category => store.dispatch({
//       type: 'CREATE_CATEGORY',
//       category
//     }))
//   }
// }


  export default store;
  export {deleteSchool,updateSchool,updatePuppy,deletePuppy};