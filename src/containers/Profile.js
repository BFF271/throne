import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Friends from './../components/Friends';

// Actions
import { userDelete } from './../actions/userActions';

// function
import { getUser } from './../functions/getUsers';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    activeUser: store.activeUser
  }
}


class Profile extends Component {

  render() {
    // Is there a user with this id stored?
    const userProfile = getUser(this.props.list, this.props.match.params.id);

    const userExists = userProfile !== undefined;
    let activeUserProfile = false;

    // Determind whether or not this is the currently logged in user.
    // This allows for profile editing and deletion IF the user is currently logged in and on their profile page.
    if(userExists) {
      activeUserProfile = userProfile.id === this.props.activeUser.userId;
    }

    // These could be broken up into seperarate comps, not found / profile page
    return (
      <div>
        {
          userExists ? (
            <div>
              <div className='row'>
                <div className="col-md-6">
                  <h4>Profile</h4>
                </div>
                <div className="col-md-6">
                  {activeUserProfile &&
                    <div>
                      <button
                        className="btn btn-danger u-inline-block"
                        onClick={() => this.props.dispatch(userDelete(this.props.activeUser.user))}>
                        Delete User
                      </button>
                      <button
                        className="btn btn-danger u-inline-block"
                        onClick={() => this.props.dispatch(userDelete(this.props.activeUser.user))}>
                        Edit User
                      </button>
                    </div>
                  }
                </div>
                <div className="col-md-12">
                  <hr />
                </div>
                <div className='col-md-6'>
                  <img className='img-responsive' src='http://loremflickr.com/800/600' alt='Default Profile Img'/>
                </div>
                <div className='col-md-6'>
                  <h4>Name: {userProfile.fullname}</h4>
                  <h4>Age: {userProfile.age}</h4>
                  <h4>Country: userCountry</h4>
                  <hr />
                  <Friends
                    userProfile={userProfile}
                    activeUserProfile={activeUserProfile}
                  />
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-md-12">
                  <h1>COMMENT WALL</h1>
                </div>
              </div>
            </div>
          ) : (
            <h1>No User Found</h1>
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile);
