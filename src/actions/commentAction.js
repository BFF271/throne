// Profile of user wall to add comment / user posting the comment / users list
export function addComment(profileId, posterId) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      profileId,
      posterId
    }
  }
}

export function deleteComment(profileId, commentId) {
  return {
    type: 'DELETE_COMMENT',
    payload: {
      profileId,
      commentId
    }
  }
}
