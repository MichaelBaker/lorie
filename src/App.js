import React, { Component } from 'react'
import CommandWindow        from './CommandWindow.js'
import _                    from 'underscore'

const topStyle = {
  display:       "flex",
  flexDirection: "column",
}

const commandStyle ={
  minHeight: "200px",
}

const lowerStyle = {
  display:       "flex",
  flexDirection: "row",
}

const listStyle = {
  flex: "1 1",
}

const renderObservation = (observation) => {
  return <div key={observation.id}>{observation.description}</div>
}

const renderReason = (reason, index) => {
  return <div key={index}>{reason}</div>
}

const renderConsideration = (consideration) => {
  return (
    <div key={consideration.id}>
      <div>{consideration.description}</div>
      <div>
        {_.map(consideration.reasons, renderReason)}
      </div>
    </div>
  )
}

const renderHypothesis = (totalWeight, hypothesis) => {
  const percent = parseInt((hypothesis.weight / totalWeight) * 100, 10).toString() + "%"
  const style   = { background: "red", height: 20, width: percent }

  return (
    <div key={hypothesis.id}>
      <div>{hypothesis.description}</div>
      <div style={style}></div>
    </div>
  )
}

class App extends Component {
  render() {
    const state            = this.props.state
    const totalWeight      = _.reduce(state.hypotheses, (a, b) => a + b.weight, 0)
    const sortedHypotheses = _.sortBy(state.hypotheses, "weight").reverse()

    return (
      <div className="App">
        <div style={topStyle}>
          <div style={commandStyle}>
            <CommandWindow store={this.props.store} command={this.props.state.command} />
          </div>
          <div style={lowerStyle}>
            <div style={listStyle}>
              <h2>Observations</h2>
              <div>{_.map(_.values(state.observations), renderObservation)}</div>
            </div>
            <div style={listStyle}>
              <h2>Considerations</h2>
              <div>{_.map(state.considerations, renderConsideration)}</div>
            </div>
            <div style={listStyle}>
              <h2>Hypotheses</h2>
              <div>{_.map(sortedHypotheses, _.partial(renderHypothesis, totalWeight))}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
