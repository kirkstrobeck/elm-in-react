import React, { Component } from 'react'

import { App as ElmApp } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

function windowAlert (message) {
  window.alert(message)
}

export default class App extends Component {
  state = {
    title: 'Start!',
    seconds: 0
  }

  componentDidMount () {
    this.interval = window.setInterval(() => {
      this.setState(({ title, seconds }) => ({
        title: title === 'Hello' ? 'Goodbye' : 'Hello',
        seconds: seconds + 1
      }))
    }, 1000)
  }

  componentDidUnmount () {
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <ElmWrapper
        src={ElmApp}
        props={this.state}
        listeners={{
          alert: windowAlert
        }}
      />
    )
  }
}
