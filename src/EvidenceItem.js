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
        <div>{evidence.description}</div>
        <div>
          {_.map(evidence.reasons, renderReason)}
        </div>
      </div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDragProps)(EvidenceItem)
