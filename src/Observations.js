import React, { Component } from 'react'
import _                    from 'underscore'
import ObservationItem      from './ObservationItem.js'
import * as Store           from './Store.js'

const listStyle = {
  flex: "1 1",
}

const renderObservation = (observation) => {
  return <ObservationItem key={observation.id} observation={observation} />
}

class Observations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: ""
    }
  }

  changeDescription(event) {
    this.setState({ description: event.target.value })
  }

  addObservation() {
    const description = this.state.description
    const store       = this.props.store
    this.setState({ description: "" })
    store.dispatch(Store.createObservation(description))
  }

  render() {
    return (
      <div style={listStyle}>
        <h2>Observations</h2>
        <input value={this.state.description} onChange={this.changeDescription.bind(this)} />
        <button onClick={this.addObservation.bind(this)}>+</button>
        <div>{_.map(_.values(this.props.observations), renderObservation)}</div>
      </div>
    )
  }
}

export default Observations
