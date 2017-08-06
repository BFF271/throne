import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { userLogout } from './../actions/userActions';

function mapStateToProps(store) {
  return {
    activeUser: store.users.activeUser
  }
}

class Header extends Component {

  render() {

    return (
      <div className='row'>
        <div className="col-md-6">
          <h5 className='u-inline-block mr-2'><Link to='/'>Home</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/signup'>Sign Up</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/login'>Log In</Link></h5>
          <h5 className='u-inline-block mr-2'><Link to='/list'>List</Link></h5>
        </div>
        <div className="col-md-6">
          {
            this.props.activeUser.loggedIn ? (
              <div>
                <h5>Logged in as: {this.props.activeUser.user.username}</h5>
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
