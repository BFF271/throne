import React, { Component } from 'react';

class Friends extends Component {

  render() {
    // Get the users friends by id and put them into userFriends as whole objects so can use friend data eg profile image etc

    let userFriends = [];

    for(var i =0; i < this.props.user.friends.length; i++) {
      for(var j=0; j < this.props.list.length; j++) {
        if(this.props.user.friends[i] === this.props.list[j].id) {
          userFriends.push(this.props.list[j]);
        }
      }
    }


    const friends = userFriends.map((user) => {
      return (
        <h4 key={user.id}>{user.username}</h4>
      )
    });

    return (
      <div>
        <h1>Friends List</h1>
        {friends}
      </div>
    )
  }
}

export default Friends;
