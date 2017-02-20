import React, { Component } from 'react'
import { DragSource }       from 'react-dnd'
import * as Style           from './Style.js'

const dragSource = {
  beginDrag(props) {
    return props.observation
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
    const {
      connectDragSource,
      isDragging,
    } = this.props

    return connectDragSource(
      <div style={Style.dragDropStyle(false, isDragging)}>
        {this.props.observation.description}
      </div>
    )
  }
}

export default DragSource("ObservationItem", dragSource, getDragProps)(ObservationItem)
