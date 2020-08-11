// Dumb Component
import React, { Component } from 'react';
import { userLogin } from './../actions/loginActions';
import { connect } from 'react-redux';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    loggedIn: store.activeUser.loggedIn
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
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
    this.props.dispatch(userLogin(this.state.username, this.state.password, this.props.list));

    // Reset the inputs
    this.setState({
      username: '',
      password: ''
    })
  }


  render() {
    return (
      <div>


      <div>

      </div>



        {
          this.props.loggedIn ? (
            <h3>Already Logged In</h3>
          ) : (
            <div>
              <h4>Log In</h4>
              <hr />
              <form className="form-inline" onSubmit={this.handleSubmit}>
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
                <input
                  type='submit'
                  value='Log In'
                  className='btn btn-success'
                />
              </form>
              <hr/>
            </div>
          )
        }
      </div>
    )
  }
}

// By passing nothing to connect it still gives access to dispatch as a prop, which is useful in this case, I do not need mapstatetoprops here.
export default connect(mapStateToProps)(Login);
