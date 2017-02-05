import React, { Component } from 'react'
import _                    from 'underscore'
import { DropTarget }       from 'react-dnd'
import * as Store           from './Store.js'

const dragTarget = {
  drop(props, monitor) {
    const store        = props.store
    const hypothesis   = props.hypothesis
    const hypothesisId = hypothesis.id
    const evidence     = monitor.getItem()

    if(hypothesisId && evidence && evidence.description) {
      store.dispatch(Store.addHypothesisEvidence(hypothesisId, evidence.description))
    }
  }
}

const getDropProps = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:            monitor.isOver(),
  }
}

const renderEvidence = (evidence, index) => {
  const style = { paddingLeft: "20px" }
  return <div key={index} style={style}>{evidence}</div>
}

class HypothesisItem extends Component {
  render() {
    const {
      totalWeight,
      hypothesis,
      connectDropTarget,
      isOver,
    } = this.props

    const percent  = parseInt((hypothesis.weight / totalWeight) * 100, 10).toString() + "%"
    const barStyle = { background: "red", height: 20, width: percent }

    const style = (() => {
      if(isOver) {
        return { background: 'blue' }
      } else {
        return {}
      }
    })()

    return connectDropTarget(
      <div key={hypothesis.id} style={style}>
        <div>{hypothesis.description}</div>
        <div style={barStyle}></div>
        {_.map(hypothesis.evidence, renderEvidence)}
      </div>
    )
  }
}

export default DropTarget("EvidenceItem", dragTarget, getDropProps)(HypothesisItem)
