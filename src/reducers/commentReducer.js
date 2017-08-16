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

        // Copy the state fully
        // let stateCopy = state.map(obj => Object.assign({}, obj));

        // Get profile to add to
        const profile = state.find((user) => {
          return user.user === action.payload.profileId;
        });

        // let newPost = {poster: action.payload.posterId, post: 'NEW COOL POST!!!'};
        // let newProfile = Object.assign({}, profile);

        // Give the post a random id for now, this is ok for testing.
        profile.posts.push({id: Math.floor((Math.random() * 1000000) + 1), poster: action.payload.posterId, post: 'NEW COOL POST!!!'});


        // profile.posts = newProfile.posts.concat(newPost);
        console.log('state');
        console.log(state);
        // console.log('stateCopy');
        // console.log(stateCopy);

        const newState = state

        return newState;
      }
    }
  return state;
}
