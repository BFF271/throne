import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userAdd, userDelete, userUpdate } from './../actions/userActions';
import ListItem from './../components/ListItem';


function mapStateToProps(store) {
  return {
    list: store.users.list
  }
}

class App extends Component {

  showProps() {
    console.log(this.props);
  }

  userUpdate(user) {
    console.log('Called userUpdate ' + user.fullname);
    this.props.dispatch(userUpdate(user));
  }

  userDelete(user) {
    console.log('Called userDelete ' + user.fullname);
    this.props.dispatch(userDelete(user));
  }

  render() {

    const userList = this.props.list.map((user) => {
      return (
        // Add key
        <ListItem
          user={user}
          userUpdate={this.userUpdate.bind(this)}
          userDelete={this.userDelete.bind(this)}
        />
      )
    });

    return (
      <div className='container'>
        <h2>User List Redux App</h2>
        <hr />
        <div>
          <button className='btn btn-default' onClick={this.showProps.bind(this)}>
            Show Props
          </button>
          <button onClick={() => this.props.dispatch(userAdd({ id: 7, fullname: 'Mr New User', age: 56}))}>
            Add User
          </button>
        </div>
        <hr />
        <div>
          {userList}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
