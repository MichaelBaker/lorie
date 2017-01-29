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

const renderConsideration = (consideration) => {
  return (
    <div key={consideration.id}>
      <div>{consideration.description}</div>
      <div>
        {_.map(consideration.reasons, renderReason)}
      </div>
    </div>
  )
}

class ConsiderationsList extends Component {
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
        <h2>Considerations</h2>
        <div style={style}>{_.map(this.props.considerations, renderConsideration)}</div>
      </div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDragProps)(ConsiderationsList)
