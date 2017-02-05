import React, { Component } from 'react'
import _                    from 'underscore'
import * as Store           from './Store.js'

const listStyle = {
  flex: "1 1",
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

class Hypotheses extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hypothesisText: ""
    }
  }

  changeHypothesisText(event) {
    this.setState({ hypothesisText: event.target.value })
  }

  addHypothesis() {
    const description = this.state.hypothesisText
    const store       = this.props.store
    this.setState({ hypothesisText: "" })
    store.dispatch(Store.createHypothesis(description))
  }

  render() {
    const totalWeight      = _.reduce(this.props.hypotheses, (a, b) => a + b.weight, 0)
    const sortedHypotheses = _.sortBy(this.props.hypotheses, "weight").reverse()

    return (
      <div style={listStyle}>
        <h2>Hypotheses</h2>
        <input value={this.state.hypothesisText} onChange={this.changeHypothesisText.bind(this)} />
        <button onClick={this.addHypothesis.bind(this)}>+</button>
        <div>{_.map(sortedHypotheses, _.partial(renderHypothesis, totalWeight))}</div>
      </div>
    )
  }
}

export default Hypotheses
