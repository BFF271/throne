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
        const friend = getUser(this.props.list, req);
        return (
          <div className='text-center' key={req}>
            <Link className='mb-2 d-block' to={`${process.env.PUBLIC_URL}/profile/${friend.id}`}>
              <img src={friend.image} className='nav-profile-img mr-1' />
              <span className='d-inline-block'>{friend.fullname}</span>
            </Link>
            <button onClick={() => this.props.dispatch(handleFriendRequest(req, this.props.activeUser.userId, true))} className='btn btn-success btn-sm mr-2'>Accept</button>
            <button onClick={() => this.props.dispatch(handleFriendRequest(req, this.props.activeUser.userId, false))} className='btn btn-danger btn-sm'>Nope</button>
            <hr />
          </div>
        )
      });
    }

    return (
        <nav className='mb-4 navbar navbar-expand-lg navbar-dark bg-dark'>
          <Link to={`${process.env.PUBLIC_URL}/`} className='navbar-brand'>Game of Social Networking</Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link to={`${process.env.PUBLIC_URL}/about`} className='nav-item nav-link mr-2'>About</Link>
              <Link to={`${process.env.PUBLIC_URL}/`} className='nav-item nav-link mr-2'>List Users</Link>
              { this.props.activeUser.userId &&
                <Link className='nav-link nav-item' to={`${process.env.PUBLIC_URL}/profile/${this.props.activeUser.userId}`}>
                  <div className='mr-1 d-inline-block' style={{verticalAlign: 'middle',backgroundImage:`url(${user.image})`, borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center top', paddingTop: '25px', width: '25px'}} />
                  <span>{user.username}</span>
                </Link>
              }
            </div>
            <div className='navbar-nav ml-auto'>
              {this.props.activeUser.loggedIn &&
                <div className='navbar-item mr-2'>
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
                      <i type='button' className='fa fa-users mt-2'></i>
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
                  <Link to={`${process.env.PUBLIC_URL}/login`} className='nav-item nav-link' href='#'>Log In</Link>
                  <Link to={`${process.env.PUBLIC_URL}/signup`} className='nav-item nav-link' href='#'>Sign Up</Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
    )
  }
}

export default connect(mapStateToProps)(Header);
