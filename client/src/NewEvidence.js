import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'
import * as Store           from './Store.js'

const dragTarget = {
  drop(props, monitor) {
    const observation = monitor.getItem()

    if(observation && observation.description) {
      props.store.dispatch(Store.createEvidence([observation.description]))
    }
  }
}

const getDropProps = (connect, monitor) => {
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

export default DropTarget("ObservationItem", dragTarget, getDropProps)(NewEvidence)
