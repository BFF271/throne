// Dumb Component
// I will leave the state for handling input changes in here, there is no
// need in moving it to redux as it only affects the form here.
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAdd } from './../actions/userActions';

function mapStateToProps(store) {
  return {
    list: store.users.list
  }
}

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fullname: '',
      age: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    // Update the input changes
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(
      userAdd({
        username: this.state.username,
        password: this.state.password,
        fullname: this.state.fullname,
        age: this.state.age
      }));

    // Reset the inputs
    this.setState({
      username: '',
      password: '',
      fullname: '',
      age: ''
    })
  }


  render() {
    return (
      <div>
        <h4>Create A New User</h4>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>
          <div className="form-group">
            <label>Fullname</label>
            <input
              name="fullname"
              value={this.state.fullname}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              value={this.state.age}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>
          <input
            type='submit'
            value='Sign Up'
            className='btn btn-success'
          />
        </form>
      </div>
    )
  }
}
export default connect(mapStateToProps)(SignUp);

// export default SignUp;
