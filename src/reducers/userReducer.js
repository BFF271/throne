// Potentially worth breaking user list up.
// Hard to split up as the friend arrays / comment arrays are within the user list.
// Would it be better to have friends / comments as seperate states?

export default function reducer(
  state = {
    list: [
      {
        id: 1,
        username: 'nstark',
        password: 'password',
        fullname: 'Ned Stark',
        age: 40,
        image: 'https://vignette.wikia.nocookie.net/gameofthrones/images/3/34/Eddard_Stark.jpg/revision/latest/top-crop/width/360/height/360?cb=20190701140812',
        friends: [3, 4],
        friendreq: [],
        home: 'Winterfell'
      },
      {
        id: 2,
        username: 'thehound',
        password: 'password',
        fullname: 'Sandor Clegane',
        age: 38,
        image: 'https://upload.wikimedia.org/wikipedia/en/5/59/The_Hound_in_%27The_Children%27.jpg',
        friends: [3, 4],
        friendreq: [],
        home: "Clegane's Keep"
      },
      {
        id: 3,
        username: 'jonsnow',
        password: 'password',
        fullname: 'Jon Snow',
        age: 25,
        image: 'https://www.thesun.co.uk/wp-content/uploads/2017/05/jon-snow-and-the-nights-watch-e1494021230137.jpg?strip=all&w=960',
        friends: [1,2,4],
        friendreq: [],
        home: 'Winterfell'
      },
      {
        id: 4,
        username: 'astark',
        password: 'password',
        fullname: 'Arya Stark',
        age: 17,
        image: 'http://img.wennermedia.com/920-width/rehost2f20162f92f132-14e00cfc-8e11-467f-90b2-cf60f7461f9a.jpg',
        friends: [1,2,3],
        friendreq: [],
        home: 'Winterfell'
      },
      {
        id: 5,
        username: 'clannister',
        password: 'password',
        fullname: 'Cersei Lannister',
        age: 37,
        image: 'https://i.pinimg.com/originals/e7/41/66/e74166adb8d99e0002fd0ee805c987c6.jpg',
        friends: [],
        friendreq: [],
        home: "King's Landing"
      },
      {
        id: 6,
        username: 'littlefinger',
        password: 'password',
        fullname: 'Petyr Baelish',
        age: 40,
        image: 'https://typeset-beta.imgix.net/2016/5/3/littlefinger-helen-sloan-hbo-f51b470f-8cfa-4b20-9055-e102c7df85de.jpeg?w=800&h=800&auto=format&fm=jpg&q=70&fit=crop&crop=faces',
        friends: [],
        friendreq: [],
        home: 'The Vale'
      },
      {
        id: 7,
        username: 'a',
        password: 'a',
        fullname: 'Mr A',
        age: 100,
        image: 'https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg',
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

      // TODO!!! - ALSO NEED TO DELETE ALL FREIEND REQUESTS FROM THAT USER
      case 'USER_DELETE': {
        const origUserList = state.list
        console.log('oul', origUserList)

        const updatedUserList = origUserList.reduce((acc, user) => {
          const updatedUser = user

          console.log('---user.id', action.payload.userId)
          if (user.id !== action.payload.userId) {
            // if we arent deleting this user, we need to remove the user being delted from any friend requets
            const newFriendReqs = user.friendreq;

            console.log('---1', newFriendReqs);

            const index = newFriendReqs.indexOf(action.payload.userId);
            if (index > -1) {
              newFriendReqs.splice(index, 1);
            }

            console.log('---2', newFriendReqs);
            updatedUser.friendreq = newFriendReqs

            acc.push(updatedUser)
          }
          return acc
        }, [])

        console.log('uul', updatedUserList)
        return {
          list: updatedUserList
        }
      }

      // User Update, can only be updated if that user is logged in
      case 'USER_UPDATE': {

        console.log('action', action.payload.id)


        console.log('--state.list', state.list)

        const origUserList = state.list

        const updatedUserList = origUserList.reduce((acc, user) => {
          console.log('---user', user)
          console.log('--acc', acc)

          if (user.id === action.payload.id) {
            console.log('YES THI SI SIT')
          }

          const isUserToAmend = user.id === action.payload.id

          if (isUserToAmend) {
            acc.push({
              ...user,
              ...action.payload.newDetails
            })
          } else {
            acc.push(user)
          }
          return acc
        }, [])

        return {
          ...state,
          list: updatedUserList
        }
      }

      // May want to break up friend and user state
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

        if(indexAccept !== -1) {
          userAccepting.friendreq.splice(indexAccept, 1);
        }

        const indexSent = userSent.friendreq.indexOf(action.payload.userAccepting);

        if(indexSent !== -1) {
          userSent.friendreq.splice(indexSent, 1);
        }

        console.log(userAccepting);
        return {
          ...state,
          list: newList
        }
      }

      // Remove friend
      case 'REMOVE_FRIEND': {

        // Create new list to be modified
        let newList = [...state.list];

        // Get the user1 obj - user being deleted
        const user1 = newList.find((user) => {
          return user.id === action.payload.user1;
        })

        // Get the user2 obj - user profile
        const user2 = newList.find((user) => {
          return user.id === action.payload.user2;
        })

        // get position of user in to delete in friends array and remove it
        const index1 = user1.friends.indexOf(action.payload.user2);
        if(index1 !== -1) {
          user1.friends.splice(index1, 1);
        }

        const index2 = user2.friends.indexOf(action.payload.user1);
        if(index2 !== -1) {
          user2.friends.splice(index2, 1);
        }

        console.log(action.payload);
        return {
          ...state,
          list: newList
        }
      }

    }
  return state;
}
