export function userAdd(user) {
  return {
    type: 'USER_ADD',
    payload: user
  }
}

export function userDelete(user) {
  return function(dispatch) {
    dispatch({
      type: 'USER_DELETE',
      payload: user
    });
    dispatch({
      type: 'LOG_OUT'
    });
  }
}

export function userUpdate(id, fullname, age) {
  return {
    type: 'USER_UPDATE',
    payload: {
      id,
      fullname,
      age
    }
  }
}

export function sendFriendRequest(userIdToSendReq) {
  return {
    type: 'SEND_FRIEND_REQUEST',
    payload: userIdToSendReq
  }
}

export function acceptFriendRequest() {
  return {
    type: 'ACCEPT_FRIEND_REQUEST'
  }
}

// Friends - Pass in the user profile we want to find friends for.
// export function getFriends(userProfile) {
//   return {
//     type: 'GET_FRIENDS',
//     payload: userProfile
//   }
// }
