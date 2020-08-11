// Profile of user wall to add comment / user posting the comment / users list
export function addComment(profileId, posterId, comment) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      profileId,
      posterId,
      comment
    }
  }
}

export function deleteComment(commentId) {
  return {
    type: 'DELETE_COMMENT',
    payload: {
      commentId
    }
  }
}
