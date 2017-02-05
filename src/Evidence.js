import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'

const dragTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem())
  }
}

const getDragProps = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:            monitor.isOver(),
  }
}

const renderReason = (reason, index) => {
  return <div key={index}>{reason}</div>
}

const renderEvidence = (evidence) => {
  return (
    <div key={evidence.id}>
      <div>{evidence.description}</div>
      <div>
        {_.map(evidence.reasons, renderReason)}
      </div>
    </div>
  )
}

class Evidence extends Component {
  render() {
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
      <div>
        <h2>Evidence</h2>
        <div style={style}>{_.map(this.props.evidence, renderEvidence)}</div>
      </div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDragProps)(Evidence)
