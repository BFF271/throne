export default function reducer(
  state = [
      {
        user: 4,
        posts: [
          {
            id: 1000,
            poster: 3,
            post: "The Dire Wolf Is The Sigil Of Your House. They Were Meant To Have Them."
          },
          {
            id: 999,
            poster: 3,
            post: "First Lesson, Stick 'Em With The Pointy End."
          },
          {
            id: 998,
            poster: 4,
            post: "Finally I've arrived at Braavos!"
          }
        ]
      },
      {
        user: 1,
        posts: [
          {
            id: 997,
            poster: 4,
            post: "Tell them the North remembers."
          }
        ]
      },
      {
        user: 2,
        posts: [
          {
            id: 996,
            poster: 3,
            post: "We Can't Defend The North If Only Half The Population Is Fighting."
          },
          {
            id: 995,
            poster: 3,
            post: "I Swore A Vow... If I Don't Take My Own Words Seriously, What Sort Of Lord Of Winterfell Would I Be?"
          },
          {
            id: 994,
            poster: 4,
            post: 'Your on my list!!!'
          }
        ]
      },
      {
        user: 5,
        posts: [
          {
            id: 993,
            poster: 7,
            post: 'So you agree... The Starks are enemies?'
          },
          {
            id: 992,
            poster: 7,
            post: "I am the king! I will punish you."
          }
        ]
      },
      {
        user: 7,
        posts: [
          {
            id: 991,
            poster: 5,
            post: "Everyone Who Isn't Us Is An Enemy."
          }
        ]
      },
      {
        user: 3,
        posts: [
          {
            id: 990,
            poster: 9,
            post: "Never forget what you are, the rest of the world will not. Wear it like armor and it can never be used to hurt you."
          }
        ]
      },
  ], action) {
    switch(action.type) {
      case 'ADD_COMMENT': {
        // Return the comments of the profile that needs to be amended
        const profile = state.find((user) => {
          return user.user === action.payload.profileId;
        });
        console.log(action.payload);
        let profileCopy = {};
        // Create the comment object for that user, if it doesn't exist
        if(profile === undefined) {
          profileCopy = {
            user: action.payload.profileId,
            posts: []
          }
          profileCopy.posts = [];
          profileCopy.posts = profileCopy.posts.concat ({
            id: Math.floor((Math.random() * 1000000) + 1),
            poster: action.payload.posterId,
            post: action.payload.comment
          })
        }
        // If the comment object for the user exists, amend it
        else {
          // Copy comments of profile found to avoid mutation
          profileCopy = Object.assign({}, profile);
          // Create new id for comment (Would be done via database), and populate data, create new ref so it's not using reference to profile.
          profileCopy.posts = profile.posts.concat({
            id: Math.floor((Math.random() * 1000000) + 1),
            poster: action.payload.posterId,
            post: action.payload.comment
          })
        }

        // Create new state array, without the comments that need to be amended
        let newState = state.filter((obj) => {
          return obj.user !== action.payload.profileId;
        });

        // Add the new comment to the newState
        newState = newState.concat(profileCopy);

        // Return the new state
        return newState;
      }
      case 'DELETE_COMMENT': {
        console.log(action.payload);

        console.log(state)

        const origCommentsArray = state

        const updatedCommentsArray = origCommentsArray.reduce((acc, obj) => {
          let updatedObj = obj

          updatedObj.posts = obj.posts.filter(post => {
            return post.id !== action.payload.commentId
          })

          acc.push(updatedObj)
          return acc
        }, [])

        return updatedCommentsArray;
      }
    }
  return state;
}
