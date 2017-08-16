// Profile of user wall to add comment / user posting the comment / users list
export function addComment(profileId, posterId, users) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      profileId,
      posterId,
      users
    }
  }
}
