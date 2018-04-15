import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import axios from 'axios'
import { Provider } from 'react-redux';
import Nav from './Nav';
import Schools from './Schools';
import Puppies from './Puppies';
import SchoolForm from './SchoolForm';
import SchoolDetail from './SchoolDetail';
import SchoolUpdate from './SchoolUpdate';
import PuppyUpdate from './PuppyUpdate';
import PuppyDetail from './PuppyDetail';

const App =()=>{
    return (
        <Provider store={ store }>
        <Router>
        <div>
        <Nav/>
        <Switch>
            <Route exact path='/schools' component={ Schools } />
            <Route exact path='/puppies' component={ Puppies } />
            <Route exact path='/createschool' component={ SchoolUpdate } />
            <Route exact path='/createpuppy' component={ PuppyUpdate } />
            <Route exact path='/schools/:id' render={({ match, history })=> <SchoolDetail id={ match.params.id*1} history={ history }/> } />
            <Route exact path='/puppies/:id' render={({ match, history })=> <PuppyDetail id={ match.params.id*1} history={ history }/> } />
            <Route exact path='/updateschools/:id' render={({ match, history })=> <SchoolUpdate id={ match.params.id*1} history={ history }/> } />
            <Route exact path='/updatepuppies/:id' render={({ match, history })=> <PuppyUpdate id={ match.params.id*1} history={ history }/> } />
            
        </Switch>
        </div>
        </Router>
        </Provider>

    )

}

axios.get('/api/puppies')
.then( result => result.data)
.then( puppies => {
  store.dispatch({
    type: 'SET_PUPPIES',
    puppies
  });
});

axios.get('/api/schools')
.then( result => result.data)
.then( schools => {
  store.dispatch({
    type: 'SET_SCHOOLS',
    schools
  });
});

export default App;