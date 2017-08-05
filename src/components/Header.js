import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div>
        <h1>This is the header</h1>

        <h2><Link to='/signup'>Sign Up</Link></h2>
        <hr />
      </div>
    )
  }
}

export default Header;
