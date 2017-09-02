export default function reducer(
  state = [
      {
        user: 4,
        posts: [
          {
            id: 999,
            poster: 3,
            post: 'User 4 First Comment from user 3'
          },
          {
            id: 998,
            poster: 4,
            post: 'User 4 First Comment from user 4'
          }
        ]
      },
      {
        user: 1,
        posts: [
          {
            id: 997,
            poster: 3,
            post: 'User 1 First Comment by user 3'
          }
        ]
      },
      {
        user: 2,
        posts: [
          {
            id: 996,
            poster: 3,
            post: 'User 2 First Comment by user 3'
          },
          {
            id: 995,
            poster: 3,
            post: 'User 2 Second Comment by user 3'
          },
          {
            id: 994,
            poster: 4,
            post: 'User 2 Third Comment by user 4'
          }
        ]
      }
  ], action) {
    switch(action.type) {
      case 'ADD_COMMENT': {
        console.log(action.payload);

        // Return the comments of the profile that needs to be amended
        const profile = state.find((user) => {
          return user.user === action.payload.profileId;
        });

        // Copy comments of profile found to avoid mutation
        let profileCopy = Object.assign({}, profile);

        // Create new id for comment (Would be done via database), and populate data, create new reference so it's not using reference to profile.
        profileCopy.posts = profile.posts.concat({
          id: Math.floor((Math.random() * 1000000) + 1),
          poster: action.payload.posterId,
          post: 'New Post'
        })

        // Create new state array, without the comments that need to be amended
        let newState = state.filter((obj) => {
          return obj.user !== action.payload.profileId;
        });

        // Add the new comment to the newState
        newState = newState.concat(profileCopy);

        // Return the new state
        return newState;
      }
    }
  return state;
}
