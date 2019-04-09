import React, { Component } from 'react';
import DropArea from './components/DropArea';
import Diagnostics from './components/Diagnostics';
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import Login from './Login'

import {
  Stitch,
  GoogleRedirectCredential
} from 'mongodb-stitch-browser-sdk';

import "./App.css";

class App extends Component {

  static propTypes = {
    appId: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)
    this.appId = props.appId
    this.client = Stitch.initializeDefaultAppClient(this.appId)

    const isAuthed = this.client.auth.isLoggedIn
    this.state = { isAuthed }
  }

  componentDidMount() {
    if (this.client.auth.hasRedirectResult()) {
      this.client.auth.handleRedirectResult().then(user => {
        this.setState({ isAuthed: this.client.auth.isLoggedIn })
      })
    }
  }

  login = async (type, { email, password } = {}) => {
    const { isAuthed } = this.state
    let credential

    if (isAuthed) {
      return
    }

    credential = new GoogleRedirectCredential()
    this.client.auth.loginWithRedirect(credential)
  }

  logout = async () => {
    this.client.auth.logout()
    this.setState({ isAuthed: false })
  }

  render() {
    const { isAuthed } = this.state

    return (
      <Container>
      {isAuthed ? (
        <div className="mquery-diag-app">
         <DropArea client={this.client}/>
         <Diagnostics />
        </div>
      ) : (
        <Login loginUser={this.login} />
      )}
      </Container>
    );
  }
}

export default App;
