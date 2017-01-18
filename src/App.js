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

let observations = [
  { id: "0", description: "This is observation number 0" },
  { id: "1", description: "This is observation number 1" },
  { id: "2", description: "This is observation number 2" },
  { id: "3", description: "This is observation number 3" },
  { id: "4", description: "This is observation number 4" },
  { id: "5", description: "This is observation number 5" },
  { id: "6", description: "This is observation number 6" },
]

let considerations = [
  { id: "0", description: "This is description 0", reasons: ["This is observation number 0", "This is observation number 0"] },
  { id: "1", description: "This is description 1", reasons: ["This is observation number 1", "This is observation number 0", "This is observation number 0"] },
  { id: "2", description: "This is description 2", reasons: ["This is observation number 2" ] },
  { id: "3", description: "This is description 3", reasons: ["This is observation number 3", "This is observation number 0", "This is observation number 0", "This is observation number 0"] },
  { id: "4", description: "This is description 4", reasons: ["This is observation number 4","This is observation number 0"] },
  { id: "5", description: "This is description 5", reasons: ["This is observation number 5" ] },
  { id: "6", description: "This is description 6", reasons: ["This is observation number 6" ] },
]

let hypotheses = [
  { id: "0", description: "This is hypothesis 0", weight: 500 },
  { id: "1", description: "This is hypothesis 1", weight: 333 },
  { id: "2", description: "This is hypothesis 2", weight: 50 },
  { id: "3", description: "This is hypothesis 3", weight: 786 },
]

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
    let totalWeight      = _.reduce(hypotheses, (a, b) => a + b.weight, 0)
    let sortedHypotheses = _.sortBy(hypotheses, "weight").reverse()

    return (
      <div className="App">
        <div style={topStyle}>
          <div style={commandStyle}>
          </div>
          <div style={lowerStyle}>
            <div style={listStyle}>
              <h2>Observations</h2>
              <div>{_.map(observations, renderObservation)}</div>
            </div>
            <div style={listStyle}>
              <h2>Considerations</h2>
              <div>{_.map(considerations, renderConsideration)}</div>
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
