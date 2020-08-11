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
            <img className="list-img" src={this.props.user.image} alt="Profile"/>
            <h4 className="u-inline-block">
              {this.props.user.fullname} - ({this.props.user.username})
            </h4>

          </div>
          <div className="col-md-6">
            <Link to={`/profile/${this.props.user.id}`}>
              <button className="btn btn-primary u-inline-block mr-2 mb-2">
                View User
              </button>
            </Link>

            {/* Must be logged in to add friend */}
            {
              this.props.activeUser.loggedIn &&
              <button className="btn btn-success d-inline-block mb-2" onClick={() => this.props.dispatch(sendFriendRequest(this.props.user.id, this.props.activeUser.userId))}>
                Add Friend
              </button>
            }

            {/* Just put quick log in here, to save writing details everytime */}
            <button
              className="btn btn-dark d-block"
              onClick={() => this.quickLogin()}>
            >
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
