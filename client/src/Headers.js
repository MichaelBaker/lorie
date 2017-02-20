import React, { Component } from 'react'
import * as Style           from './Style.js'

const HeadersStyle = {
  display:       'flex',
  flex:          '1 1',
  flexDirection: 'row',
}

const Header = {
  color:      Style.DarkGrey0,
  fontFamily: 'sans-serif',
  paddingTop: '20px',
  ...Style.Column,
}

class Headers extends Component {
  render() {
    const state = this.props.state
    const store = this.props.store

    return (
      <div style={HeadersStyle}>
        <h2 style={Header}>Observations</h2>
        <h2 style={Header}>Evidence</h2>
        <h2 style={Header}>Hypotheses</h2>
      </div>
    );
  }
}

export default Headers
