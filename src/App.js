import React, { Component } from 'react'
import Hypotheses           from './Hypotheses.js'
import Observations         from './Observations.js'
import Evidence             from './Evidence.js'
import _                    from 'underscore'
import { DragDropContext }  from 'react-dnd'
import HTML5Backend         from 'react-dnd-html5-backend'

const topStyle = {
  display:       "flex",
  flexDirection: "column",
}

const lowerStyle = {
  display:       "flex",
  flexDirection: "row",
}

const listStyle = {
  flex: "1 1",
}

class App extends Component {
  render() {
    const state = this.props.state
    const store = this.props.store

    return (
      <div className="App">
        <div style={topStyle}>
          <div style={lowerStyle}>
            <Hypotheses   store={store} hypotheses={state.hypotheses} />
            <Observations store={store} observations={state.observations} />
            <div style={listStyle}>
              <Evidence evidence={state.evidence} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
