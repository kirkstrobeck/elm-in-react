import React, { Component } from 'react'
import Elm from 'react-elm-components'

export default class ElmWrapper extends Component {
  componentDidUpdate () {
    this.send(this.props.props)
  }

  render () {
    const { src, props, listeners = {} } = this.props
    return (
      <Elm
        src={src}
        flags={props}
        ports={ports => {
          this.send = ports.reactToElm.send

          if (listeners) {
            ports.elmToReact.subscribe(({ command, payload }) => {
              Object.keys(listeners).forEach(listener => {
                const func = listeners[listener]
                if (func && command === listener) {
                  func(payload)
                }
              })
            })
          }
        }}
      />
    )
  }
}
