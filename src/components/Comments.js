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
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      showInput: true,
      commentText: ''
    }
  }

  handleInputChange(e) {
    // Update the input changes
    this.setState({
      commentText: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(addComment(
      this.props.userProfile.id,
      this.props.activeUser.userId,
      this.state.commentText
    ))

    // Reset the inputs
    this.setState({
      commentText: ''
    })
  }

  render() {
    let areFriends = false;
    // Allow comments to be added if users are friends
    if(this.props.activeUser.userId !== undefined) {
      areFriends = isFriend(this.props.userProfile.id, this.props.activeUser.userId, this.props.list);
    }

    // Get comments for current profile
    let userComments = {};

    console.log('---this.props.comments', this.props.comments)
    userComments = this.props.comments.find((comment) => {
      console.log('--comment', comment)
      return comment.user === Number(this.props.userProfile.id);
    });

    let comments = [];
    // Build Comment Section. This could potentially be broken up further
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
              <img className="list-img" src={postedBy !== undefined ? postedBy.image : 'https://www.marshall.edu/it/files/question-mark-circle-icon.png'} alt="Posted By" />
            </div>

            <div className='col-md-3'>
              {post.post}
            </div>

            <div className='col-md-3'>
              {postedBy !== undefined ? postedBy.fullname : 'User Deleted'}
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

    let addCommentSection = null;

    if(this.props.activeUser.userId === undefined) {
      addCommentSection = <h4>Sign in to add a comment</h4>;
    }
    else if((!areFriends) && (this.props.activeUser.userId !== this.props.userProfile.id)) {
      addCommentSection = <h4>You need to be friends to add a comment</h4>;
    }
    else {
      addCommentSection =
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.commentText}
          onChange={this.handleInputChange}
          className="comments-add-textarea form-control mb-1" />

        <button type="submit" className="btn btn-primary u-inline-block mr-2">Add Comment</button>
      </form>
    }


    return (
      <div>
        <div className='row'>
          <div className="col-md-6">
            <h4>Comments</h4>
          </div>
          <div className="col-md-6">
            { addCommentSection }
          </div>
        </div>
        <hr />
        { comments.length > 0 ? (
            comments.reverse()
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
