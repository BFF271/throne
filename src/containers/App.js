import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// Actions
import { userDelete, userUpdate } from './../actions/userActions';
import { userLogin, userLogout } from './../actions/loginActions';

// Components
import Home from './../containers/Home';
import Header from './../components/Header';
import List from './../containers/List';
import SignUp from './../containers/SignUp';
import Login from './../containers/Login';
import Profile from './../containers/Profile';


import './App.css';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    loginInfo: store.loginInfo.loginInfo
  }
}

class App extends Component {

  showProps() {
    console.log(this.props);
  }

  clearStorage() {
    localStorage.removeItem('socialReduxState');
  }

  // These can potentially be moved out and instead change to using mapDispatchToProps for easier import.

  userLogin(username, password) {
    this.props.dispatch(userLogin(username, password, this.props.list));
  }

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
          <Header activeUser={this.props.loginInfo.activeUser}/>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={() => {
            return <Login userLogin={this.userLogin.bind(this)} />
          }}/>
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
          <Route path='/profile/:id' render={(props) => {
            return (
              <Profile list={this.props.list} {...props} />
            )
          }}/>

          <div>
            <hr />
            <button className='btn btn-default mr-2' onClick={this.showProps.bind(this)}>
              Show Props
            </button>
            <button className='btn btn-default mr-2' onClick={this.clearStorage.bind(this)}>
              Clear Storage
            </button>
            <hr />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
