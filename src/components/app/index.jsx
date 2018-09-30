import React, { Component } from 'react'

import { App as ElmApp } from './index.elm'
import ElmWrapper from '../helpers/elm-wrapper'

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

  add100 = () => {
    this.setState(({ seconds }) => ({ seconds: seconds + 100 }))
  }

  render () {
    return (
      <ElmWrapper
        src={ElmApp}
        props={this.state}
        listeners={{ add100: this.add100 }}
      />
    )
  }
}
