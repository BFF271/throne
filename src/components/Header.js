import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { userLogout } from './../actions/loginActions';
import  { handleFriendRequest } from './../actions/userActions';

// function
import { getUser } from './../functions/getUsers';

function mapStateToProps(store) {
  return {
    activeUser: store.activeUser,
    list: store.users.list
  }
}

class Header extends Component {

  render() {

    const user = getUser(this.props.list, this.props.activeUser.userId);
    let friendreq = [];
    if(user !== undefined) {
      friendreq = user.friendreq.map((req) => {
        return (
          <div key={req}>
            <h5>{req}</h5>
            <button onClick={() => this.props.dispatch(handleFriendRequest(req, this.props.activeUser.userId, true))} className='btn btn-success'>Accept</button>
            <button onClick={() => this.props.dispatch(handleFriendRequest(req, this.props.activeUser.userId, false))} className='btn btn-danger'>Reject</button>
          </div>
        )
      });
    }


    return (
      <div className='row'>
        <div className="col-md-6">
          <h5 className='u-inline-block mr-2'><Link to='/'>Home</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/signup'>Sign Up</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/login'>Log In</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/list'>List</Link></h5>
          { this.props.activeUser.userId &&
            <Link to={`/profile/${this.props.activeUser.userId}`}>
              <h5 className="u-inline-block mr-2">
                View Your Profile
              </h5>
            </Link>
          }
        </div>
        <div className="col-md-3">
          <h5>Friend Requests:</h5>
          {friendreq}
        </div>
        <div className="col-md-3">
          {
            this.props.activeUser.loggedIn ? (
              <div>
                <h5>Logged in as: {user.username}</h5>
                <button className='btn btn-default' onClick={() => this.props.dispatch(userLogout())}>Log Out</button>
              </div>
            ) : (
              <h5>Not Logged In</h5>
            )
          }
        </div>

        <div className="col-md-12">
          <hr/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header);
