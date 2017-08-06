import React, { Component } from 'react';

class Profile extends Component {

  render() {
    // This should be moved to initialisation and also a check should be put in to see if the user exists, if it does not, goto a page with cannot be found.
    const user = this.props.list.find((user) => {
      return user.id === Number(this.props.match.params.id);
    });

    return (
      <div>
        <div className='row'>
          <div className="col-md-12">
            <h4>Profile</h4>
            <hr/>
          </div>
          <div className='col-md-6'>
            <img className='img-responsive' src='http://loremflickr.com/800/600' alt='Default Profile Img'/>
          </div>
          <div className='col-md-6'>
            <h4>Name: {user.fullname}</h4>
            <h4>Age: {user.age}</h4>
            <h4>Country: userCountry</h4>
            <hr />
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
