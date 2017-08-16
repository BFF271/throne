import React, { Component } from 'react';
import { connect } from 'react-redux';

// Singular Functions
import { isFriend } from './../functions/friendCheck';


// Actions
import { addComment } from './../actions/commentAction';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    comments: store.comments,
    activeUser: store.activeUser
  }
}

class Comments extends Component {

  render() {

    // Have to create these empty objects as react will not work when trying to use undefined check?!
    let userComments = {};
    userComments = this.props.comments.find((comment) => {
      return comment.user === Number(this.props.userProfile.id);
    });

    let comments = [];
    if(userComments !== undefined) {
      comments = userComments.posts.map((post) => {
        return (
          <div className='row' key={post.post}>
            <div className='col-md-6'>
              {post.post}
            </div>

            <div className='col-md-6'>
              {post.poster}
            </div>
            <div className="col-md-12">
              <hr />
            </div>
          </div>
        )
      });
    }

    let areFriends = false;
    // Allow comments to be added if users are friends
    if(this.props.activeUser.userId !== undefined) {
      areFriends = isFriend(this.props.userProfile.id, this.props.activeUser.userId, this.props.list);
    }

    let addCommentBtn = null;
    console.log('fefwe');
    console.log(this.props.activeUser.userId);
    console.log(this.props.userProfile);
    console.log('dede');
    if(this.props.activeUser.userId === undefined) {
      addCommentBtn = <h4>Sign in to add a comment</h4>;
    }
    else if(this.props.activeUser.userId === this.props.userProfile.id) {
      addCommentBtn = <button onClick={() => this.props.dispatch(addComment(this.props.userProfile, this.props.activeUser, this.props.list))} className="btn btn-default u-inline-block mr-2">Add Comment To Own Wall</button>
    }
    else if(!areFriends) {
      addCommentBtn = <h4>You need to be friends to add a comment</h4>;
    }
    else {
      addCommentBtn = <button onClick={() => this.props.dispatch(addComment(this.props.userProfile, this.props.activeUser, this.props.list))} className="btn btn-default u-inline-block mr-2">Add Comment</button>
    }


    return (
      <div>
        <div className='row'>
          <div className="col-md-6">
            <h1>Comments</h1>
          </div>
          <div className="col-md-6">
            { addCommentBtn }
          </div>
        </div>
        <hr />
        { comments.length > 0 ? (
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
