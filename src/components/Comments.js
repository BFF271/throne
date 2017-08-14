import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return {
    comments: store.comments.comments
  }
}

class Comments extends Component {

  render() {

    // Get comment of user with is
    let userComments = {};
    userComments = this.props.comments.find((comment) => {
      console.log(comment);
      return comment.user === Number(this.props.userProfile.id);
    });


    let comments = [];
    if(userComments !== undefined) {
      comments = userComments.posts.map((post) => {
        return (
          // post is fine to use for now as key
          <div key={post}>
            {post}
          </div>
        )
      });
    }

    return (
      <div>
        <div className='row'>
          <div className="col-md-6">
            <h1>Comments</h1>
          </div>
          <div className="col-md-6">
            <button className="btn btn-default u-inline-block mr-2">
              Add Comment
            </button>
          </div>
        </div>
        <hr />
        {
          comments.length !== 0 ? (
            comments
          ) : (
            <h1>No Comments</h1>
          )
        }
      </div>
    )
  }
}

// By passing nothing to connect it still gives access to dispatch as a prop, which is useful in this case, I do not need mapstatetoprops here.
export default connect(mapStateToProps)(Comments);
