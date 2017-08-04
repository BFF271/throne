import React, { Component } from 'react';
import { connect } from 'react-redux';

// Your importing the Action into the View
import { userAdd, userDelete, userUpdate } from './../actions/userActions';

// Get store values in as props
// Return the props you want App to have
function mapStateToProps(store) {
  return {
    users: store.users.list
  }
}

class App extends Component {

  showProps() {
    console.log(this.props);
  }

  render() {

    const userList = this.props.users.map(user =>
      <li onClick={() => this.props.dispatch(userUpdate(user))}>{user}</li>
    )

    return (
      <div>
        <h1>My First Redux App</h1>
        <ul>
          {userList}
        </ul>
        <button onClick={this.showProps.bind(this)}>Show Props</button>
        <button onClick={() => this.props.dispatch(userAdd('Mr New User'))}>Add User</button>
        <button onClick={() => this.props.dispatch(userDelete('John Cena'))}>Delete User</button>

      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
