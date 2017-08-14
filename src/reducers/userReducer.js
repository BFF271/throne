export default function reducer(
  state = {
    list: [
      {
        id: 1,
        username: 'steveaustin',
        password: 'password',
        fullname: 'Steve Austin',
        age: 34,
        friends: [],
        friendreq: []
      },
      {
        id: 2,
        username: 'hulkhogan',
        password: 'password',
        fullname: 'Hulk Hogan',
        age: 60,
        friends: [],
        friendreq: []
      },
      {
        id: 3,
        username: 'therock',
        password: 'password',
        fullname: 'The Rock',
        age: 50,
        friends: [],
        friendreq: []
      },
      {
        id: 4,
        username: 'a',
        password: 'a',
        fullname: 'Mr A',
        age: 100,
        friends: [],
        friendreq: [1,2,3]
      },
    ]
  }, action) {
    switch(action.type) {
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

      // Add Friend
      case 'SEND_FRIEND_REQUEST': {
        // Create new list to be modified
        let newList = [...state.list];

        // Get the user that is being SENT the friend request
        const userToSendReq = newList.find((user) => {
          return user.id === action.payload.userIdToSendReq;
        })


        // Go through the users friend requests, to see if it has already been sent or not.
        function checkIfReqExists(request) {
          return request === action.payload.activeUserId;
        }

        function checkIfAlreadyFriend(request) {
          return request === action.payload.activeUserId;
        }

        // If user to send request to isn't the user logged in
        if(userToSendReq.id !== action.payload.activeUserId) {
          // Check to see if friend request is still pending or not
          if(!userToSendReq.friendreq.some(checkIfReqExists)) {
            // Then check to see if they are friends already.
            if(!userToSendReq.friends.some(checkIfAlreadyFriend)) {
              userToSendReq.friendreq = userToSendReq.friendreq.concat(action.payload.activeUserId);
              console.log('Sending friend Request');
            }
            else {
              console.log('Already friends')
            }
          }
          else {
            console.log('friend req already sent');
          }
        }
        else {
          console.log('Cant Add Yourself as a friend');
        }

        return {
          ...state,
          list: newList
        }


        console.log(userToSendReq);
        console.log(action.payload);
      }


      // Handle friend request
      // TODO - Refactor this
      case 'HANDLE_FRIEND_REQUEST': {

        // Create new list to be modified
        let newList = [...state.list];

        // Get the user that is accepting the friend request
        const userAccepting = newList.find((user) => {
          return user.id === action.payload.userAccepting;
        })

        // Get the user that sent the friend request
        const userSent = newList.find((user) => {
          return user.id === action.payload.userToAccept;
        })

        // If Rejected don't add to friends list
        // Otherwise add friend to both users
        if(action.payload.isAccepted) {
          userAccepting.friends = userAccepting.friends.concat(action.payload.userToAccept);

          userSent.friends = userSent.friends.concat(action.payload.userAccepting);
        }

        // Remove the friend from friendreq on both users
        const indexAccept = userAccepting.friendreq.indexOf(action.payload.userToAccept);

        if(indexAccept != -1) {
          userAccepting.friendreq.splice(indexAccept, 1);
        }

        const indexSent = userSent.friendreq.indexOf(action.payload.userAccepting);

        if(indexSent != -1) {
          userSent.friendreq.splice(indexSent, 1);
        }

        console.log(userAccepting);
        return {
          ...state,
          list: newList
        }
      }
    }
  return state;
}
