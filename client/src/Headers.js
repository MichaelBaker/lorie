import React, { Component } from 'react'
import * as Style           from './Style.js'

const HeadersStyle = {
  display:       'flex',
  flex:          '1 1',
  flexDirection: 'row',
}

const Header = {
  color:      Style.DarkGrey,
  fontFamily: 'sans-serif',
  paddingTop: '20px',
  ...Style.Column,
}

class Headers extends Component {
  render() {
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
