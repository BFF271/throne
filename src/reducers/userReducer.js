export default function reducer(
  state = {
    activeUser: {
      loggedIn: false,
      user: {}
    },
    list: [
      { id: 1, username: 'steveaustin', password: 'password', fullname: 'Steve Austin', age: 34 },
      { id: 2, username: 'hulkhogan', password: 'password', fullname: 'Hulk Hogan', age: 60 },
      { id: 3, username: 'brethart', password: 'password', fullname: 'Bret Hart', age: 50 }
    ]
  }, action) {
    switch(action.type) {
      case 'LOG_IN': {
        // Check to see if the user exists with the correct password
        const activeUser = state.list.find((user) => {
          return ((user.username === action.payload.username) && (user.password === action.payload.password));
        })

        if(activeUser === undefined) {
          // If user log in failed return -1 (-1 means noone logged in)
          return {
            ...state,
            activeUser: {
              loggedIn: false,
              user: {}
            }
          };
        }
        else {
          return {
            ...state,
            activeUser: {
              loggedIn: true,
              user: activeUser
            }
          }
        }
      }

      case 'LOG_OUT': {
        const noUser = {};
        return {
          ...state,
          activeUser: {
            loggedIn: false,
            user: noUser
          }
        }
      }

      case 'USER_ADD': {
        // Set new user id as +1 of the highest id (Would be done by DB)
        const highestIndex = Math.max.apply(Math, state.list.map((user) => {
          return user.id;
        }));

        // Create a newUser Object with the payload and adding the new id
        const newUser = Object.assign(action.payload, {id: highestIndex + 1})

        // Add the new user to the list
        return {
          ...state,
          list: [
            ...state.list, newUser
          ]
        }
      }

      // Create a new array from list, that doesn't include the user to delete
      case 'USER_DELETE': {
        // When you delete your account, you also need to be logged out as that user no longer exists
        console.log('Deleting');
        console.log(action.payload);
        return {
          ...state,
          list: state.list.filter((user) => {
            return user !== action.payload;
          })
        }
      }

      // User Update, can only be updated if that user is logged in
      case 'USER_UPDATE': {
        let newList = [...state.list];

        const userIndex = newList.findIndex((user) => {
          return user.id === action.payload.id;
        });

        newList[userIndex] = action.payload;
        return {
          ...state,
          list: newList
        }
      }
    }
  return state;
}
