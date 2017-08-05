import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className='row'>
          <div className="col-md-12">
            <h4>Profile</h4>
            <hr/>
          </div>
          <div className='col-md-6'>
            <img className='img-responsive' src='http://loremflickr.com/800/600' />
          </div>
          <div>
            <h4>Name: userName</h4>
            <h4>Age: userAge</h4>
            <h4>Country: userCountry</h4>
          </div>
          <hr />
          <div>
            <h1>FRIENDS</h1>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <h1>COMMENT WALL</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
