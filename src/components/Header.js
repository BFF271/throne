import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div>
        <h2><Link to='/'>Home</Link></h2>
        <h2><Link to='/signup'>Sign Up</Link></h2>
        <h2><Link to='/list'>List</Link></h2>
        <hr />
      </div>
    )
  }
}

export default Header;
