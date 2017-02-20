import React, { Component } from 'react'
import _                    from 'underscore'
import NewEvidence          from './NewEvidence.js'
import EvidenceItem         from './EvidenceItem.js'
import * as Style           from './Style.js'

const renderEvidenceItem = (store, evidence) => {
  return <EvidenceItem key={evidence.id} store={store} evidence={evidence} />
}

class Evidence extends Component {
  render() {
    return (
      <div style={Style.Column}>
        <NewEvidence store={this.props.store} />
        {_.map(this.props.evidence, _.partial(renderEvidenceItem, this.props.store))}
      </div>
    )
  }
}

export default Evidence
