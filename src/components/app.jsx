import React, { Component } from 'react'

import Example from './example'

export default class App extends Component {
  state = {
    title: 'Start!',
    seconds: 0
  }

  componentDidMount () {
    window.setInterval(() => {
      this.setState(({ title, seconds }) => ({
        title: title === 'Hello' ? 'Goodbye' : 'Hello',
        seconds: seconds + 1
      }))
    }, 1000)
  }

  render () {
    return <Example {...this.state} />
  }
}
