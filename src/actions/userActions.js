export function userAdd(user) {
  return {
    type: 'USER_ADD',
    payload: user
  }
}

export function userDelete(user) {
  return {
    type: 'USER_DELETE',
    payload: user
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
