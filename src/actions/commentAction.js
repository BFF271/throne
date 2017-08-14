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
