import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'
import * as Store           from './Store.js'
import * as Style           from './Style.js'

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

    const hoverStyle = (() => {
      if(isOver) {
        return {
          borderBottom: '1px solid',
          borderColor:  Style.MediumGrey,
        }
      } else {
        return {}
      }
    })()

    const style = {
      borderBottom: 'none',
      ...hoverStyle,
    }

    return connectDropTarget(
      <div style={Style.InputSection}>
        <div style={{...Style.InputText, ...style,}}>New Evidence</div>
        <button style={Style.InputButton}>+</button>
      </div>
    )
  }
}

export default DropTarget("ObservationItem", dragTarget, getDropProps)(NewEvidence)
