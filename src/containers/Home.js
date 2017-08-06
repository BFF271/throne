// Dumb Component
import React, { Component } from 'react';

class Home extends Component {

  render() {
    return (
      <div>
        <h2>Welcome To The User App By Matt P</h2>
        <hr />
        <h4>This is a social media app, the features I have / will be adding are...</h4>
        <hr />
        <ul>
          <li>View a list of current users in the system, with the abilty to search for them</li>
          <li>From the list you can view their profile</li>
          <li>When viewing their profile you can add them as a friend</li>
          <li>Sign Up and Login</li>
          <li>Create and edit your profile when logged in as that user</li>
          <li>View your own and other users profiles (if their profile is not set to private)</li>
          <li>Your profile will contain, Your personal details (Name - Age - Country)</li>
          <li>Your profile will contain, a profile picture and a link to all of your images</li>
          <li>Your profile will contain a comments section</li>
          <li>Your profile will contain a list of all your friends and how many friends you have</li>
          <li>You will be able to edit your profile details if you are logged in</li>
          <li>Add friends with users in the system</li>
          <li>Upload images to your profile with a link in your profile to see them, you will have one image which is shown on your profile page, it can be changed by selecting another image.</li>
          <li>View and comment on your own and friends photos</li>
          <li>Comment on users profile wall</li>
          <li>Reply to comments on your own or friends walls</li>
          <li>Remove comments and images from your own profile</li>
          <li>Abilty to sign out</li>
          <li>Abilty to delete your own account, this will delete your user, all images associated with it, all comments</li>
          <li>If already logged in, the signup and login pages say, your already signed in</li>
          <li>more features to come...</li>
        </ul>

        <hr />
        <h4>Details</h4>
        <ul>
          <li>Represent user profile page by user id</li>
          <li>Leave user profile link as /profile/:id for now, however I may change it just to /:id as facebook does</li>
        </ul>
        <hr />
      </div>
    )
  }
}

export default Home;
