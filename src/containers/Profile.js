import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Friends from './../components/Friends';
import Comments from './../components/Comments';

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

// TODO - you can currently delete friends from other peoples profiles, do a check for this!!!
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
                        className="btn btn-danger u-inline-block mr-2"
                        onClick={() => this.props.dispatch(userDelete(this.props.activeUser.userId))}>
                        Delete Your Profile
                      </button>
                      <button
                        className="btn btn-default u-inline-block"
                        onClick={() => this.props.dispatch(userDelete(this.props.activeUser.user))}>
                        Edit Profile
                      </button>
                    </div>
                  }
                </div>
                <div className="col-md-12">
                  <hr />
                </div>
                <div className='col-md-6'>
                  <img className="img-responsive" src={userProfile.image}  alt="Profile"/>
                </div>
                <div className='col-md-6'>
                  <h4>Name: {userProfile.fullname}</h4>
                  <h4>Age: {userProfile.age}</h4>
                  <h4>Home: {userProfile.home}</h4>
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
                  <Comments
                    userProfile={userProfile}
                  />
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
