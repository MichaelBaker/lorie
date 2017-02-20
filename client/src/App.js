import React, { Component } from 'react'
import Hypotheses           from './Hypotheses.js'
import Observations         from './Observations.js'
import Evidence             from './Evidence.js'
import Headers              from './Headers.js'
import Explanations         from './Explanations.js'
import _                    from 'underscore'
import { DragDropContext }  from 'react-dnd'
import HTML5Backend         from 'react-dnd-html5-backend'

const lowerStyle = {
  display:       "flex",
  flexDirection: "row",
}

class App extends Component {
  render() {
    const state = this.props.state
    const store = this.props.store

    const style = {
      display:       'flex',
      flexDirection: 'column',
      maxWidth:      1250,
      margin:        'auto',
    }

    return (
      <div style={style}>
        <Headers />
        <Explanations />
        <div style={lowerStyle}>
          <Observations store={store} observations={state.observations} />
          <Evidence     store={store} evidence={state.evidence} />
          <Hypotheses   store={store} hypotheses={state.hypotheses} />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
