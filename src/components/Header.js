import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

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

    const popover = (
      <Popover id='popover-basic'>
        <Popover.Title as='h3'>Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
        </Popover.Content>
      </Popover>
    );

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
          <a className='navbar-brand' href='#'>Social Site</a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link to='/about' className='nav-item nav-link mr-2'>About</Link>
              <Link to='/' className='nav-item nav-link mr-2'>List Users</Link>
              { this.props.activeUser.userId &&
                <Link className='nav-link nav-item' to={`/profile/${this.props.activeUser.userId}`}>
                  <img src={user.image} className='nav-profile-img mr-1' />
                  {user.username}
                </Link>
              }
            </div>
            <div className='navbar-nav ml-auto'>
              {/*
              <div className='nav-item'>
                {friendreq}
              </div>
              */}

              {this.props.activeUser.loggedIn &&
                <div className='navbar-item'>
                  <OverlayTrigger trigger='click' placement='bottom' overlay={
                    <Popover id='popover-basic'>
                      <Popover.Title as='h3'>Friend Requests</Popover.Title>
                      <Popover.Content>
                        {friendreq.length > 0 ? (
                          <React.Fragment>
                          {friendreq}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            No new users have added you :-(
                          </React.Fragment>
                        )}
                      </Popover.Content>
                    </Popover>
                  }>
                    <div>
                      <i type='button' className='fa fa-users'></i>
                      {friendreq.length > 0 &&
                        <div className='ml-1 badge badge-danger'>{friendreq.length}</div>
                      }
                    </div>
                  </OverlayTrigger>
                </div>
              }




              {this.props.activeUser.loggedIn ? (
                <div className='nav-item'>
                  <button className='btn btn-default' onClick={() => this.props.dispatch(userLogout())}>Log Out</button>
                </div>
              ) : (
                <React.Fragment>
                  <Link to='/login' className='nav-item nav-link' href='#'>Log In</Link>
                  <Link to='/signup' className='nav-item nav-link' href='#'>Sign Up</Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
    )
  }
}

export default connect(mapStateToProps)(Header);
