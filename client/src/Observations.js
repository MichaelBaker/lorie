import React, { Component } from 'react'
import _                    from 'underscore'
import ObservationItem      from './ObservationItem.js'
import * as Store           from './Store.js'
import * as Style           from './Style.js'

const renderObservation = (observation) => {
  return <ObservationItem key={observation.id} observation={observation} />
}

const renderObservations = (observations) => {
  if(observations.length === 0) {
    return <div style={{ color: Style.MediumGrey}}>No Observations</div>
  } else {
    return _.map(observations, renderObservation)
  }
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
      <div style={Style.Column}>
        <div style={Style.InputSection}>
          <input
            style={Style.InputText}
            placeholder='A new observation'
            value={this.state.description}
            onChange={this.changeDescription.bind(this)}
          />
          <button
            style={Style.InputButton}
            onClick={this.addObservation.bind(this)}
          >+</button>
        </div>
        {renderObservations(_.values(this.props.observations))}
      </div>
    )
  }
}

export default Observations
