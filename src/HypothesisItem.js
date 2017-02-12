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

const renderEvidence = (store, hypothesisId, isDefaultHypothesis, evidence, index) => {
  const increment = () => {
    store.dispatch(Store.incrementEvidenceDb(hypothesisId, evidence.id))
  }

  const decrement = () => {
    store.dispatch(Store.decrementEvidenceDb(hypothesisId, evidence.id))
  }

  return (
    <div key={index}>
      <span>{evidence.description}</span>
      <span>
        {isDefaultHypothesis ? null : <button onClick={decrement}>-</button>}
        {evidence.db}
        {isDefaultHypothesis ? null : <button onClick={increment}>+</button>}
      </span>
    </div>
  )
}

class HypothesisItem extends Component {
  render() {
    const {
      store,
      hypothesis,
      totalNegativeWeight,
      totalPositiveWeight,
      connectDropTarget,
      isOver,
    } = this.props

    const totalWeight = totalNegativeWeight + totalPositiveWeight

    const totalNegativePercent = parseInt((totalNegativeWeight / totalWeight) * 100, 10)
    const totalPositivePercent = 100 - totalNegativePercent

    const negativeWeight = hypothesis.weight < 0 ? Math.abs(hypothesis.weight) : 0
    const positiveWeight = hypothesis.weight > 0 ? hypothesis.weight           : 0

    const negativePercent = parseInt((negativeWeight / totalWeight) * 100, 10)
    const positivePercent = parseInt((positiveWeight / totalWeight) * 100, 10)

    const negativePadding = totalNegativePercent - negativePercent
    const positivePadding = totalPositivePercent - positivePercent


    const negativePaddingStyle = { display: "inline-block", background: "none",  height: 20, width: negativePadding + "%" }
    const negativeBarStyle     = { display: "inline-block", background: "red",   height: 20, width: negativePercent + "%" }
    const positivePaddingStyle = { display: "inline-block", background: "none",  height: 20, width: positivePadding + "%" }
    const positiveBarStyle     = { display: "inline-block", background: "green", height: 20, width: positivePercent + "%" }

    const style = (() => {
      if(isOver) {
        return { background: 'blue' }
      } else {
        return {}
      }
    })()

    const element = (
      <div key={hypothesis.id} style={style}>
        <div>{hypothesis.description}</div>
        <div style={negativePaddingStyle}></div>
        <div style={negativeBarStyle}></div>
        <div style={positiveBarStyle}></div>
        <div style={positivePaddingStyle}></div>
        <div style={{ paddingLeft: "20px" }}>
          {_.map(hypothesis.evidence, _.partial(renderEvidence, store, hypothesis.id, hypothesis.isDefault))}
        </div>
      </div>
    )

    if(hypothesis.isDefault) {
      return element
    } else {
      return connectDropTarget(element)
    }
  }
}

export default DropTarget("EvidenceItem", dragTarget, getDropProps)(HypothesisItem)
