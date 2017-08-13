import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { addFriend } from './../actions/userActions';


import EditUser from './EditUser';

function mapStateToProps(store) {
  return {
    loggedIn: store.users.activeUser.loggedIn,
    list: store.users.list
  }
}


class ListItem extends Component{

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="u-inline-block">
              {this.props.user.username}: {this.props.user.age}
            </h4>
          </div>
          <div className="col-md-6">
            <Link to={`/profile/${this.props.user.id}`}>
              <button className="btn btn-default u-inline-block mr-2">
                View User
              </button>
            </Link>

            {// Must be logged in to add friend
              this.props.loggedIn &&
              <button className="btn btn-success u-inline-block" onClick={() => this.props.dispatch(addFriend(this.props.user.id))}>
                Add Friend
              </button>
            }
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
