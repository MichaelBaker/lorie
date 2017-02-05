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

class NewEvidence extends Component {
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
      <div style={style}>+ New Evidence</div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDragProps)(NewEvidence)
