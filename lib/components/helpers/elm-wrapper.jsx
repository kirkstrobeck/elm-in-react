import React, { Component } from 'react'
import Elm from 'react-elm-components'

export default class ElmWrapper extends Component {
  componentDidUpdate () {
    this.send(this.props.props)
  }

  render () {
    const { src, props } = this.props
    return (
      <Elm
        src={src}
        flags={props}
        ports={ports => {
          this.send = ports.state.send
        }}
      />
    )
  }
}
