import React, { Component } from 'react'
import _                    from 'underscore'
import * as Store           from './Store.js'
import HypothesisItem       from './HypothesisItem.js'

const listStyle = {
  flex: "1 1",
}

const renderHypothesis = (store, totalWeight, hypothesis) => {
  return <HypothesisItem key={hypothesis.id} store={store} totalWeight={totalWeight} hypothesis={hypothesis} />
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
    const store            = this.props.store

    return (
      <div style={listStyle}>
        <h2>Hypotheses</h2>
        <input value={this.state.hypothesisText} onChange={this.changeHypothesisText.bind(this)} />
        <button onClick={this.addHypothesis.bind(this)}>+</button>
        <div>{_.map(sortedHypotheses, _.partial(renderHypothesis, store, totalWeight))}</div>
      </div>
    )
  }
}

export default Hypotheses
