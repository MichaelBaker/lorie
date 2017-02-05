import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'
import * as Store           from './Store.js'

const reasonStyle = {
  paddingLeft: "20px"
}

const dragTarget = {
  drop(props, monitor) {
    const evidence    = props.evidence
    const evidenceId  = evidence.id
    const observation = monitor.getItem()

    if(evidenceId && observation && observation.description) {
      props.store.dispatch(Store.addReason(evidenceId, observation.description))
    }
  }
}

const getDragProps = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:            monitor.isOver(),
  }
}

const renderReason = (reason, index) => {
  return <div key={index} style={reasonStyle}>{reason}</div>
}

class EvidenceItem extends Component {
  constructor(props) {
    super(props)

    this.state = { mode: this.displayMode() }
  }

  startEditing() {
    const mode = {
      type:           "editing",
      newDescription: "",
    }

    this.setState({ mode })
  }

  displayMode() {
    return { type: "display" }
  }

  updateDescription(event) {
    if(this.state.mode.type !== "editing") return
    const mode = { ...this.state.mode, newDescription: event.target.value }
    this.setState({ mode })
  }

  cancelEditing() {
    this.setState({ mode: this.displayMode() })
  }

  setNewDescription() {
    const evidenceId  = this.props.evidence.id
    const description = this.state.mode.newDescription
    this.props.store.dispatch(Store.changeEvidenceDescription(evidenceId, description))
    this.setState({ mode: this.displayMode() })
  }

  renderDescription(evidence) {
    const mode = this.state.mode

    if(mode.type === "editing") {
      return (
        <div>
          <input value={mode.newDescription} onChange={this.updateDescription.bind(this)} />
          <button onClick={this.cancelEditing.bind(this)}>-</button>
          <button onClick={this.setNewDescription.bind(this)}>+</button>
        </div>
      )
    } else if(mode.type === "display") {
      return <div>{evidence.description} <span onClick={this.startEditing.bind(this)}>+</span></div>
    } else {
      return (
        <div>
          {evidence.description} <span onClick={this.startEditing.bind(this)}>+</span>
          <div>{"Unknown mode: " + mode.type}</div>
        </div>
      )
    }
  }

  render() {
    const evidence = this.props.evidence

    const {
      connectDropTarget,
      isOver,
    } = this.props

    const style = (() => {
      if(isOver) {
        return { background: 'red' }
      } else {
        return {}
      }
    })()

    return connectDropTarget(
      <div style={style}>
        {this.renderDescription(evidence)}
        <div>
          {_.map(evidence.reasons, renderReason)}
        </div>
      </div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDragProps)(EvidenceItem)
