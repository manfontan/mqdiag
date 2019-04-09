import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment, Icon, Button } from 'semantic-ui-react'

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired
  }

  handleChange = (e, { name, value }) => {
    return this.setState(prevState => ({
      userInput: { ...prevState.userInput, [name]: value }
    }))
  }

  render() {
    const { loginUser } = this.props

    return (
      <Segment.Group>
        <Segment>
          <Button
            onClick={() => {
              loginUser('google')
            }}
            color="google plus"
          >
            <Icon name="google" />Log In with Google
          </Button>
        </Segment>
      </Segment.Group>
    )
  }
}
export default Login
