import React, { Component } from 'react'
import Hypotheses           from './Hypotheses.js'
import Observations         from './Observations.js'
import Evidence             from './Evidence.js'
import Headers              from './Headers.js'
import Explanations         from './Explanations.js'
import _                    from 'underscore'
import { DragDropContext }  from 'react-dnd'
import HTML5Backend         from 'react-dnd-html5-backend'
import * as Store           from './Store.js'
import * as Style           from './Style.js'

const lowerStyle = {
  display:       "flex",
  flexDirection: "row",
}

class App extends Component {
  clearState() {
    this.props.store.dispatch(Store.clearState())
  }

  render() {
    const state = this.props.state
    const store = this.props.store

    const style = {
      display:       'flex',
      flexDirection: 'column',
      maxWidth:      1250,
      margin:        'auto',
      marginBottom:  50,
    }

    const clearStyle = {
      textAlign: "center",
      color:     Style.Red,
      margin:    10,
    }

    return (
      <div style={style}>
        <Headers />
        <Explanations />
        <div style={clearStyle} onClick={this.clearState.bind(this)}>Clear State</div>
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
