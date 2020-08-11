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
      newDetails: {
        age,
        fullname  
      }
    }
  }
}

// May want to break up friends into seperate state as opposed to keeping friends in users list
export function sendFriendRequest(userIdToSendReq, activeUserId) {
  return {
    type: 'SEND_FRIEND_REQUEST',
    payload: {
      userIdToSendReq,
      activeUserId
    }
  }
}

export function handleFriendRequest(userToAccept, userAccepting, isAccepted) {
  return {
    type: 'HANDLE_FRIEND_REQUEST',
    payload: {
      userToAccept,
      userAccepting,
      isAccepted
    }
  }
}

export function removeFriend(user1, user2) {
  return {
    type: 'REMOVE_FRIEND',
    payload: {
      user1,
      user2,
    }
  }
}
