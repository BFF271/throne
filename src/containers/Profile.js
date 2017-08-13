import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Friends from './../components/Friends';

// Actions
import { userDelete } from './../actions/userActions';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    activeUser: store.users.activeUser
  }
}


class Profile extends Component {

  render() {
    // Is there a user with this id stored?
    const user = this.props.list.find((user) => {
      return user.id === Number(this.props.match.params.id);
    });

    const userExists = user !== undefined;
    let activeUserProfile = false;

    // Determind whether or not this is the currently logged in user.
    // This allows for profile editing and deletion IF the user is currently logged in and on their profile page.
    if(userExists) {
      activeUserProfile = user.id === this.props.activeUser.user.id;
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
                  <h4>Name: {user.fullname}</h4>
                  <h4>Age: {user.age}</h4>
                  <h4>Country: userCountry</h4>
                  <hr />
                  <Friends
                    user={user}
                    activeUserProfile={activeUserProfile}
                    list={this.props.list}
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
