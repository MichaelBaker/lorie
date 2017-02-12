import React, { Component } from 'react'
import { DragSource }       from 'react-dnd'

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

    const style = (() => {
      if(isDragging) {
        return { color: 'gray' }
      } else {
        return {}
      }
    })()

    return connectDragSource(<div style={style}>{this.props.observation.description}</div>)
  }
}

export default DragSource("ObservationItem", dragSource, getDragProps)(ObservationItem)
