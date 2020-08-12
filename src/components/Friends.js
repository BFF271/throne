import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { removeFriend } from './../actions/userActions';

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
        <div style={{width: '180px'}} className='card d-inline-block mr-3 mb-3'>
          <Link to={`/profile/${user.id}`}>
            <div style={{backgroundImage:`url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center top', paddingTop: '100%', width: '100%'}} className='card-img-top' />

            <div className='p-2'>
              <h6 className='card-title mb-0'>{user.fullname}</h6>
            </div>
          </Link>
          {this.props.activeUserProfile &&
            <button onClick={() => this.props.dispatch(removeFriend(user.id, this.props.userProfile.id))} className='btn btn-danger profile-friend--delete'>Delete Friend</button>
          }
        </div>
      )
    });

    return (
      <div>
        <h4 onClick={this.logstuff}>Friends</h4>
        {friends}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Friends);
