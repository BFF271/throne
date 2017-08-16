// Profile of user wall to add comment / user posting the comment / users list
export function addComment(profile, user, users) {
  return {
    type: 'ADD_COMMENT',
    payload: {
      profile,
      user,
      users
    }
  }
}
