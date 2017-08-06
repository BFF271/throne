import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <h2>Logged in as {this.props.activeUser.username}</h2>
        </div>

        <div className="col-md-12">
          <hr/>
        </div>
      </div>
    )
  }
}

export default Header;
