import React, { Component } from 'react'
import _                    from 'underscore'
import NewEvidence          from './NewEvidence.js'
import EvidenceItem         from './EvidenceItem.js'
import * as Style           from './Style.js'

const renderEvidenceItem = (store, evidence) => {
  return <EvidenceItem key={evidence.id} store={store} evidence={evidence} />
}

const renderEvidence = (store, evidence) => {
  if(evidence.length === 0) {
    return <div style={{ color: Style.MediumGrey}}>No Evidence</div>
  } else {
    return _.map(evidence, _.partial(renderEvidenceItem, store))
  }
}

class Evidence extends Component {
  render() {
    return (
      <div style={Style.Column}>
        <NewEvidence store={this.props.store} />
        {renderEvidence(this.props.store, _.values(this.props.evidence))}
      </div>
    )
  }
}

export default Evidence
