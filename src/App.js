import React, { Component } from 'react'
import Hypotheses           from './Hypotheses.js'
import ObservationItem      from './ObservationItem.js'
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

const renderObservation = (observation) => {
  return <ObservationItem key={observation.id} observation={observation} />
}

class App extends Component {
  render() {
    const state = this.props.state
    const store = this.props.store

    return (
      <div className="App">
        <div style={topStyle}>
          <div style={lowerStyle}>
            <Hypotheses store={store} hypotheses={state.hypotheses} />
            <div style={listStyle}>
              <h2>Observations</h2>
              <div>{_.map(_.values(state.observations), renderObservation)}</div>
            </div>
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
