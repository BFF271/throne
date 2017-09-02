import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// Actions
import { userDelete, userUpdate } from './../actions/userActions';

// Components
import Home from './../containers/Home';
import Header from './../components/Header';
import List from './../containers/List';
import SignUp from './../containers/SignUp';
import Login from './../containers/Login';
import Profile from './../containers/Profile';
import DevBar from './../components/DevBar';


import './App.css';

function mapStateToProps(store) {
  return {
    activeUser: store.activeUser,
    list: store.users.list,
    comments: store.comments
  }
}

class App extends Component {

  // These can potentially be moved out and instead change to using mapDispatchToProps for easier import.
  userUpdate(id, fullname, age) {
    this.props.dispatch(userUpdate(id, fullname, age));
  }

  userDelete(user) {
    this.props.dispatch(userDelete(user));
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login}/>
          <Route exact path='/list' component={() => {
            return (
              <List
                list={this.props.list}
                userUpdate={this.userUpdate.bind(this)}
                userDelete={this.userDelete.bind(this)}
              />
            )
          }}/>

          { /* Pass in the react-router-dom props via props. Gives access to .match so I can search user id --- TODO - The other routes should use this method also.*/}
          <Route path='/profile/:id' component={Profile} />
          <DevBar props={this.props}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
