import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

// Actions
import { userDelete } from './../actions/userActions';

function mapStateToProps(store) {
  return {
    activeUser: store.users.activeUser
  }
}


class Profile extends Component {

  constructor() {
    super();

    this.deleteUser = this.deleteUser.bind(this);
  }

  // TODO: Need to use Thunks to log user out and then delete that user. -- look at this tomorrow.
  deleteUser() {
    console.log('deleteuser');
  }

  render() {
    // This should be moved to initialisation and also a check should be put in to see if the user exists, if it does not, goto a page with cannot be found.
    const user = this.props.list.find((user) => {
      return user.id === Number(this.props.match.params.id);
    });

    return (
      <div>
        <div className='row'>
          <div className="col-md-6">
            <h4>Profile</h4>
          </div>
          <div className="col-md-6">
            <button className="btn btn-danger u-inline-block" onClick={this.deleteUser}>
              Delete User
            </button>
          </div>
          <div className="col-md-12">
            <hr />
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

export default connect(mapStateToProps)(Profile);
