import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { sendFriendRequest } from './../actions/userActions';
import { quickLogIn } from './../actions/loginActions';
import { userLogout } from './../actions/loginActions';

function mapStateToProps(store) {
  return {
    activeUser: store.activeUser,
    list: store.users.list
  }
}


class ListItem extends Component{
  constructor(props) {
    super()

    this.quickLogin = this.quickLogin.bind(this)
  }

  quickLogin() {
    this.props.dispatch(userLogout())
    this.props.dispatch(quickLogIn(this.props.user.id, this.props.list))
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div style={{borderRadius: '50%', backgroundImage:`url(${this.props.user.image})`, backgroundSize: 'cover', backgroundPosition: 'center top', height: '160px', width: '160px'}} className='d-inline-block mr-4' />

            <div style={{verticalAlign: 'top'}} className='d-inline-block'>
              <h5 className="d-block">
                Name: {this.props.user.fullname}
              </h5>

              <h5 className="d-block">
                Username: {this.props.user.username}
              </h5>
            </div>


          </div>
          <div className="col-md-6">
            <Link to={`/profile/${this.props.user.id}`}>
              <button className="btn btn-primary u-inline-block mr-2 mb-2">
                View User Profile
              </button>
            </Link>

            {/* Must be logged in to add friend */}
            {this.props.activeUser.loggedIn &&
              <React.Fragment>
                <button className="btn btn-success d-inline-block mb-2" onClick={() => this.props.dispatch(sendFriendRequest(this.props.user.id, this.props.activeUser.userId))}>
                  Add Friend
                </button>
                <p className='small'>(You will need to log into this users account to accept the friend request to be friends)</p>
              </React.Fragment>
            }

            {/* Just put quick log in here, to save writing details everytime */}
            <button
              className="btn btn-secondary mb-1 d-block"
              onClick={() => this.quickLogin()}>
              Quick log in as this user
            </button>
            <p className='small'>(Will be logged out of anyone currently logged in)</p>
          </div>
        </div>

        <div>
          {/* Move this to users page / create an edit user page  */}
          {/* <EditUser user={this.props.user} userUpdate={this.props.userUpdate} /> */}
          <hr />
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ListItem);
