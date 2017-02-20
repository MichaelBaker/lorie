import React, { Component } from 'react'
import _                    from 'underscore'
import HypothesisItem       from './HypothesisItem.js'
import * as Store           from './Store.js'
import * as Style           from './Style.js'

const renderHypothesis = (store, negativeWeight, positiveWeight, hypothesis) => {
  return (
    <HypothesisItem
      key={hypothesis.id}
      store={store}
      totalNegativeWeight={negativeWeight}
      totalPositiveWeight={positiveWeight}
      hypothesis={hypothesis}
    />
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
    const negativeWeight = _.reduce(this.props.hypotheses, (a, b) => {
      if(b.weight < 0) {
        return a + Math.abs(b.weight)
      } else {
        return a
      }
    }, 0)

    const positiveWeight = _.reduce(this.props.hypotheses, (a, b) => {
      if(b.weight > 0) {
        return a + b.weight
      } else {
        return a
      }
    }, 0)

    const sortedHypotheses = _.sortBy(this.props.hypotheses, "weight").reverse()
    const store            = this.props.store

    return (
      <div style={Style.Column}>
        <input
          placeholder='A new hypothesis'
          value={this.state.hypothesisText}
          onChange={this.changeHypothesisText.bind(this)}
        />
        <button onClick={this.addHypothesis.bind(this)}>+</button>
        <div>{_.map(sortedHypotheses, _.partial(renderHypothesis, store, negativeWeight, positiveWeight))}</div>
      </div>
    )
  }
}

export default Hypotheses
