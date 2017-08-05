// Dumb Component
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EditUser from './EditUser';

class ListItem extends Component{

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="u-inline-block">
              {this.props.user.fullname}: {this.props.user.age}
            </h4>
          </div>
          <div className="col-md-6">
            <Link to={`/profile/${this.props.user.id}`}>
              <button className="btn btn-default u-inline-block mr-2">
                View User
              </button>
            </Link>
            <button
              className="btn btn-default u-inline-block mr-2"
              onClick={() => this.showEditable(this.props.user.id)}>
              Edit User
            </button>
            <button className="btn btn-danger u-inline-block" onClick={() => this.props.userDelete(this.props.user)}>
              Delete User
            </button>
          </div>
        </div>

        <div>
          <EditUser user={this.props.user} userUpdate={this.props.userUpdate} />
        </div>
      </div>
    )
  }
}

export default ListItem;
