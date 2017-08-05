// Dumb Component
import React, { Component } from 'react';
import ListItem from './../components/ListItem';

class List extends Component {
  render() {

    const userList = this.props.list.map((user) => {
      return (
        <ListItem
          key={user.id}
          user={user}
          userUpdate={this.props.userUpdate}
          userDelete={this.props.userDelete}
        />
      )
    });

    return (
      <div>
        <h4>User List</h4>
        <hr />
        <div>
          {userList}
        </div>
      </div>
    )
  }
}

export default List;
