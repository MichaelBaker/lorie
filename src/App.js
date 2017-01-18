import React, { Component } from 'react'
import _ from 'underscore'

let topStyle = {
  display:       "flex",
  flexDirection: "column",
}

let commandStyle ={
  minHeight: "200px",
}

let lowerStyle = {
  display:       "flex",
  flexDirection: "row",
}

let listStyle = {
  flex: "1 1",
}

let renderObservation = (observation) => {
  return <div key={observation.id}>{observation.description}</div>
}

let renderReason = (reason, index) => {
  return <div key={index}>{reason}</div>
}

let renderConsideration = (consideration) => {
  return (
    <div key={consideration.id}>
      <div>{consideration.description}</div>
      <div>
        {_.map(consideration.reasons, renderReason)}
      </div>
    </div>
  )
}

let renderHypothesis = (totalWeight, hypothesis) => {
  let percent = parseInt((hypothesis.weight / totalWeight) * 100, 10).toString() + "%"
  let style   = { background: "red", height: 20, width: percent }

  return (
    <div key={hypothesis.id}>
      <div>{hypothesis.description}</div>
      <div style={style}></div>
    </div>
  )
}

class App extends Component {
  render() {
    let state            = this.props.state
    let totalWeight      = _.reduce(state.hypotheses, (a, b) => a + b.weight, 0)
    let sortedHypotheses = _.sortBy(state.hypotheses, "weight").reverse()

    return (
      <div className="App">
        <div style={topStyle}>
          <div style={commandStyle}>
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
