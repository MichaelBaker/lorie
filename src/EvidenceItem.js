import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'

const reasonStyle = {
  paddingLeft: "20px"
}

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
