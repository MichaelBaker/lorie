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

  addHypothesis(event) {
    event.preventDefault()
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
        <form style={Style.InputSection} onSubmit={this.addHypothesis.bind(this)}>
          <input
            style={Style.InputText}
            placeholder='A new hypothesis'
            value={this.state.hypothesisText}
            onChange={this.changeHypothesisText.bind(this)}
          />
          <button
            type="submit"
            style={Style.InputButton}
          >+</button>
        </form>
        <div>{_.map(sortedHypotheses, _.partial(renderHypothesis, store, negativeWeight, positiveWeight))}</div>
      </div>
    )
  }
}

export default Hypotheses
