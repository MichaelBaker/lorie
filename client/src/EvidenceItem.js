import React, { Component }       from 'react'
import _                          from 'underscore'
import { DropTarget, DragSource } from 'react-dnd'
import * as Store                 from './Store.js'
import * as Style                 from './Style.js'

const reasonStyle = {
  paddingLeft: "20px"
}

const dragSource = {
  beginDrag(props) {
    return props.evidence
  }
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

const getDropProps = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:            monitor.isOver(),
  }
}

const getDragProps = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging:        monitor.isDragging(),
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

  setNewDescription(event) {
    event.preventDefault()
    const evidenceId  = this.props.evidence.id
    const description = this.state.mode.newDescription
    this.props.store.dispatch(Store.changeEvidenceDescription(evidenceId, description))
    this.setState({ mode: this.displayMode() })
  }

  renderDescription(evidence) {
    const mode = this.state.mode

    if(mode.type === "editing") {
      return (
        <form onSubmit={this.setNewDescription.bind(this)}>
          <input autoFocus value={mode.newDescription} onChange={this.updateDescription.bind(this)} />
          <button style={Style.InputButton} type="submit">✓</button>
          <button style={Style.InputButton} onClick={this.cancelEditing.bind(this)}> ⃠</button>
        </form>
      )
    } else if(mode.type === "display") {
      return <form>{evidence.description} <span onClick={this.startEditing.bind(this)}>+</span></form>
    } else {
      return (
        <form>
          {evidence.description} <span onClick={this.startEditing.bind(this)}>+</span>
          <div>{"Unknown mode: " + mode.type}</div>
        </form>
      )
    }
  }

  render() {
    const evidence = this.props.evidence

    const {
      connectDropTarget,
      isOver,
      connectDragSource,
      isDragging,
    } = this.props

    return connectDragSource(
      connectDropTarget(
        <div style={Style.dragDropStyle(isOver, isDragging)}>
          {this.renderDescription(evidence)}
          <div>
            {_.map(evidence.reasons, renderReason)}
          </div>
        </div>
      )
    )
  }
}

const DroppableEvidenceItem = DropTarget("ObservationItem", dragTarget, getDropProps)(EvidenceItem)
const DraggableEvidenceItem = DragSource("EvidenceItem", dragSource, getDragProps)(DroppableEvidenceItem)

export default DraggableEvidenceItem
