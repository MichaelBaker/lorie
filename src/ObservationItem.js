import React, { Component } from 'react'
import { DragSource }       from 'react-dnd'
import * as Store           from './Store.js'

const dragSource = {
  beginDrag(props) {
    return {}
  }
}

const getDragProps = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging:        monitor.isDragging(),
  }
}

class ObservationItem extends Component {
  render() {
    const id = this.props.observation.id

    const {
      connectDragSource,
      isDragging,
    } = this.props

    if (isDragging) {
      return connectDragSource(<div>Yep</div>)
    } else {
      return connectDragSource(<div>Nope</div>)
    }
  }
}

export default DragSource("ObservationItem", dragSource, getDragProps)(ObservationItem)
