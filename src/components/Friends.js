import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return {
    list: store.users.list
  }
}

class Friends extends Component {

  constructor() {
    super();
    this.logstuff = this.logstuff.bind(this);
  }

  logstuff() {
    console.log(this.props);
  }

  render() {

    // Get the users friends by id and put them into userFriends as whole objects so can use friend data eg profile image etc
    let userFriends = [];

    for(let i = 0; i < this.props.userProfile.friends.length; i++) {
      for(let j= 0; j < this.props.list.length; j++) {
        if(this.props.userProfile.friends[i] === this.props.list[j].id) {
          userFriends.push(this.props.list[j]);
        }
      }
    }

    const friends = userFriends.map((user) => {
      return (
        <div className='profile-friend' key={user.id}>
          {user.username}
        </div>
      )
    });

    return (
      <div>
        <h1 onClick={this.logstuff}>Friends List</h1>

        {friends}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Friends);
