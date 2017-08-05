import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// Actions
import { userAdd, userDelete, userUpdate } from './../actions/userActions';

// Components
import Home from './../containers/Home';
import Header from './../components/Header';
import ListItem from './../components/ListItem';
import AddUser from './../components/AddUser';

import './App.css';

function mapStateToProps(store) {
  return {
    list: store.users.list
  }
}

class App extends Component {

  showProps() {
    console.log(this.props);
  }

  userAdd(user) {
    this.props.dispatch(userAdd(user));
  }

  userUpdate(id, fullname, age) {
    this.props.dispatch(userUpdate(id, fullname, age));
  }

  userDelete(user) {
    this.props.dispatch(userDelete(user));
  }

  render() {

    const userList = this.props.list.map((user) => {
      return (
        <ListItem
          key={user.id}
          user={user}
          userUpdate={this.userUpdate.bind(this)}
          userDelete={this.userDelete.bind(this)}
        />
      )
    });

    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route exact path='/' component={Home} />
          <AddUser userAdd={this.userAdd.bind(this)} />
          <div>
            <button className='btn btn-default mr-2' onClick={this.showProps.bind(this)}>
              Show Props
            </button>
          </div>
          <hr />
          <div>
            {userList}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
