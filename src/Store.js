import * as Redux from 'redux'
import createUUID from 'uuid/v4'

const reducer = (state, action) => {
  if(action.type === "@@redux/INIT") {
    // Ignore
  } else if(action.type === "AddObservation") {
    state.observations[action.observation.id] = action.observation
  } else if(action.type === "CreateObservation") {
    const id                  = createUUID()
    const description         = action.description
    const observation         = { id, description, weight: 1000 }
    state.observations[id]    = observation
  } else if(action.type === "AddHypothesis") {
    state.hypotheses[action.hypothesis.id] = action.hypothesis
  } else if(action.type === "CreateHypothesis") {
    const id                  = createUUID()
    const description         = action.description
    const hypothesis          = { id, description, evidence: [], weight: 1000 }
    state.hypotheses[id]      = hypothesis
  } else if(action.type === "CreateEvidence") {
    const id           = createUUID()
    const reasons      = action.reasons
    const description  = "New Evidence"
    const evidence     = { id, reasons, description }
    state.evidence[id] = evidence
  } else if(action.type === "AddEvidence") {
    state.evidence[action.evidence.id] = action.evidence
  } else if(action.type === "AddReason") {
    const evidenceId = action.evidenceId
    const reason     = action.reason
    const evidence   = state.evidence[evidenceId]
    evidence.reasons.push(reason)
  } else if(action.type === "ChangeEvidenceDescription") {
    const evidence = state.evidence[action.evidenceId]
    if(evidence) {
      evidence.description = action.description
    }
  } else if(action.type === "AddHypothesisEvidence") {
    const hypothesis = state.hypotheses[action.hypothesisId]
    if(hypothesis) {
      hypothesis.evidence.push(action.description)
    }
  } else {
    console.log("Action not impelmented.", action)
  }

  return state
}

const initialState = {
  observations:   {},
  evidence:       {},
  hypotheses:     {},
}

export const createObservation = (description) => {
  return {
    type: "CreateObservation",
    description,
  }
}

export const createHypothesis = (description) => {
  return {
    type: "CreateHypothesis",
    description,
  }
}

export const createEvidence = (reasons) => {
  return {
    type: "CreateEvidence",
    reasons,
  }
}

export const addHypothesis = (hypothesis) => {
  return {
    type:       "AddHypothesis",
    hypothesis: hypothesis,
  }
}

export const addObservation = (observation) => {
  return {
    type:        "AddObservation",
    observation: observation,
  }
}

export const addEvidence = (evidence) => {
  return {
    type:     "AddEvidence",
    evidence: evidence,
  }
}

export const addReason = (evidenceId, reason) => {
  return {
    type: "AddReason",
    evidenceId,
    reason,
  }
}

export const changeEvidenceDescription = (evidenceId, description) => {
  return {
    type: "ChangeEvidenceDescription",
    evidenceId,
    description,
  }
}

export const addHypothesisEvidence = (hypothesisId, description) => {
  return {
    type: "AddHypothesisEvidence",
    hypothesisId,
    description,
  }
}

export const createStore = () => {
  return Redux.createStore(reducer, initialState)
}
