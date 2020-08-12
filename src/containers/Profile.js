import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Friends from './../components/Friends';
import Comments from './../components/Comments';

// Actions
import { userDelete } from './../actions/userActions';
import { userUpdate } from './../actions/userActions';
import { toggleProfileEditing } from './../actions/loginActions';

// function
import { getUser } from './../functions/getUsers';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    activeUser: store.activeUser
  }
}

// TODO - you can currently delete friends from other peoples profiles, do a check for this!!!
class Profile extends Component {

  constructor(props) {
    super()

    const userProfile = getUser(props.list, props.match.params.id)
    this.state = {
      inputValues: {
        name: userProfile.fullname,
        age: userProfile.age,
        home: userProfile.home
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(e) {
    console.log(e.target.value)
    console.log(e.target.id)
    this.setState({
      inputValues: {
        ...this.state.inputValues,
        [e.target.id]: (e.target.id === 'age') ? Number(e.target.value) : e.target.value
      }
    }, () => {
      console.log(this.state)
    })
  }


  render() {

    console.log('activeuser', this.props.activeUser)
    // Is there a user with this id stored?
    const userProfile = getUser(this.props.list, this.props.match.params.id);

    const userExists = userProfile !== undefined;
    let activeUserProfile = false;

    // Determind whether or not this is the currently logged in user.
    // This allows for profile editing and deletion IF the user is currently logged in and on their profile page.
    if(userExists) {
      activeUserProfile = userProfile.id === this.props.activeUser.userId;
    }

    // These could be broken up into seperarate comps, not found / profile page
    return (
      <div>
        {
          userExists ? (
            <div>
              <div className='row'>
                <div className='col-md-5'>
                  <div style={{backgroundImage:`url(${userProfile.image})`, backgroundSize: 'cover', backgroundPosition: 'center top', paddingTop: '100%', width: '100%'}} />
                  {activeUserProfile &&
                    <div>
                      <button
                        className="btn btn-danger btn-block u-inline-block mr-2"
                        style={{borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}}
                        onClick={() => this.props.dispatch(userDelete(this.props.activeUser.userId))}>
                        Delete Your (Whole) Profile
                      </button>
                    </div>
                  }
                </div>
                <div className='col-md-7'>

                  {this.props.activeUser.isEditingProfile ? (
                    <form>
                      <div className='form-group'>
                        <label htmlFor='nameInput'>Name</label>
                        <input
                          type='text'
                          className='form-control'
                          id='name'
                          value={this.state.inputValues.name}
                          onChange={this.handleFormChange}
                          placeholder='Name' />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='nameInput'>Age</label>
                        <input
                          type='text'
                          className='form-control'
                          id='age'
                          value={this.state.inputValues.age}
                          onChange={this.handleFormChange}
                          placeholder='Age' />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='nameInput'>Home</label>
                        <input
                          type='text'
                          className='form-control'
                          id='home'
                          value={this.state.inputValues.home}
                          onChange={this.handleFormChange}
                          placeholder='Home' />
                      </div>

                      <button
                        type='submit'
                        className='btn btn-primary my-1'
                        onClick={(e) => {
                          e.preventDefault()
                          this.props.dispatch(userUpdate(this.props.activeUser.userId, this.state.inputValues.name, this.state.inputValues.age, this.state.inputValues.home))
                          this.props.dispatch(toggleProfileEditing())
                        }}
                      >
                        Update Details
                      </button>
                    </form>
                  ) : (
                    <React.Fragment>
                      <h5>Name: {userProfile.fullname}</h5>
                      <h5>Age: {userProfile.age}</h5>
                      <h5>Home: {userProfile.home}</h5>
                    </React.Fragment>
                  )}

                  <hr />
                  {activeUserProfile &&
                    <React.Fragment>
                      <button
                        className="btn btn-primary u-inline-block"
                        onClick={() => this.props.dispatch(toggleProfileEditing())}>
                        {this.props.activeUser.isEditingProfile ? (
                          <span>Cancel Editing</span>
                        ) : (
                          <span>Edit Profile</span>
                        )}
                      </button>
                      <hr />
                    </React.Fragment>
                  }
                  <Friends
                    userProfile={userProfile}
                    activeUserProfile={activeUserProfile}
                  />
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-md-12">
                  <Comments
                    userProfile={userProfile}
                  />
                </div>
              </div>
            </div>
          ) : (
            <h1>No User Found</h1>
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile);
