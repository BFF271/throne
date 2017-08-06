// loginReducer - For lack of a better name, tracks which user is currently logged in, it will handle log in and log out functionality

// TODO: This needs refactoring, probably not the best idea to be setting empty objects like this, so look into this.
export default function reducer(
  state = {
    loginInfo: {
      activeUser: {
        id: -1,
        username: 'Not Logged In',
        password: 'password',
        fullname: 'Not Logged In',
        age: 0
      }
    }
  }, action) {
    switch(action.type) {
      case 'LOG_IN': {
        // Check to see if the user exists with the correct password
        const activeUser = action.payload.list.find((user) => {
          return ((user.username === action.payload.username) && (user.password === action.payload.password));
        })

        // Users doesn't exist or password was incorrect
        if(activeUser === undefined) {
          console.log('Your username or password were incorrect. ' + activeUser);
          return {
            loginInfo: {
              activeUser: {
                id: -1,
                username: 'Not Logged In',
                password: 'password',
                fullname: 'Not Logged In',
                age: 0
              }
            }
          }
        }
        else {
          console.log('Log In Successful :' + activeUser.username);
          return {
            loginInfo: {
              activeUser: activeUser
            }
          }
        }
      }
      case 'LOG_OUT': {
        return {
          loginInfo: {
            activeUser: 'egrgfg'
          }
        }
      }
    }
  return state;
}
