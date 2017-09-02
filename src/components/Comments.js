import React, { Component } from 'react';
import { connect } from 'react-redux';

// Singular Functions
import { isFriend } from './../functions/friendCheck';
import { getUser } from './../functions/getUsers';

// Actions
import { addComment } from './../actions/commentAction';
import { deleteComment } from './../actions/commentAction';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    comments: store.comments,
    activeUser: store.activeUser
  }
}

class Comments extends Component {

  render() {
    let areFriends = false;
    // Allow comments to be added if users are friends
    if(this.props.activeUser.userId !== undefined) {
      areFriends = isFriend(this.props.userProfile.id, this.props.activeUser.userId, this.props.list);
    }

    // Get comments for current profile
    let userComments = {};
    userComments = this.props.comments.find((comment) => {
      return comment.user === Number(this.props.userProfile.id);
    });

    let comments = [];
    if(userComments !== undefined) {
      comments = userComments.posts.map((post) => {

        const postedBy = getUser(this.props.list, post.poster);
        // Can delete comment if its on your profile, or you posted the comment on another profile
        let canDeleteComment = false;

        if((this.props.activeUser.userId === this.props.userProfile.id) || (this.props.activeUser.userId === post.poster)) {
          canDeleteComment = true;
        }

        return (

          // add unique key for posts
          <div key={post.id} className='row'>
            <div className='col-md-3'>
              <img className="list-img" src={postedBy.image} alt="Posted By" />
            </div>

            <div className='col-md-3'>
              {post.post}
            </div>

            <div className='col-md-3'>
              {postedBy.fullname}
            </div>

            <div className='col-md-3'>
              { canDeleteComment === true &&
                <button onClick={() => this.props.dispatch(deleteComment(this.props.userProfile.id, post.id, this.props.list))} className="btn btn-danger">Delete Comment</button>
              }
            </div>

            <div className="col-md-12">
              <hr />
            </div>
          </div>
        )
      });
    }

    let addCommentBtn = null;

    if(this.props.activeUser.userId === undefined) {
      addCommentBtn = <h4>Sign in to add a comment</h4>;
    }
    else if(this.props.activeUser.userId === this.props.userProfile.id) {
      addCommentBtn = <button onClick={() => this.props.dispatch(addComment(this.props.userProfile.id, this.props.activeUser.userId))} className="btn btn-default u-inline-block mr-2">Add Comment To Own Wall</button>
    }
    else if(!areFriends) {
      addCommentBtn = <h4>You need to be friends to add a comment</h4>;
    }
    else {
      addCommentBtn = <button onClick={() => this.props.dispatch(addComment(this.props.userProfile.id, this.props.activeUser.userId))} className="btn btn-default u-inline-block mr-2">Add Comment</button>
    }


    return (
      <div>
        <div className='row'>
          <div className="col-md-6">
            <h4>Comments</h4>
          </div>
          <div className="col-md-6">
            { addCommentBtn }
          </div>
        </div>
        <hr />
        { comments.length > 0 ? (
            comments
          ) : (
            <h4>No Comments</h4>
          )
        }
      </div>
    )
  }
}

// By passing nothing to connect it still gives access to dispatch as a prop, which is useful in this case, I do not need mapstatetoprops here.
export default connect(mapStateToProps)(Comments);
