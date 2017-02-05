import React, { Component } from 'react'
import _                    from 'underscore'
import NewEvidence          from './NewEvidence.js'
import EvidenceItem         from './EvidenceItem.js'

const renderEvidenceItem = (evidence) => {
  return <EvidenceItem key={evidence.id} evidence={evidence} />
}

class Evidence extends Component {
  render() {
    return (
      <div style={{ flex: "1 1" }}>
        <h2>Evidence</h2>
        <NewEvidence store={this.props.store} />
        {_.map(this.props.evidence, renderEvidenceItem)}
      </div>
    )
  }
}

export default Evidence
