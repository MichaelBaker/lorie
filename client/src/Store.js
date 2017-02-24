import * as Redux from 'redux'
import createUUID from 'uuid/v4'
import _          from 'underscore'

const updateHypothesisWeights = (hypotheses) => {
  const totalDbs = _.reduce(hypotheses, (totalDb, hypothesis) => {
    return totalDb + _.reduce(hypothesis.evidence, (db, evidence) => db + Math.abs(evidence.db), 0)
  }, 0)

  _.each(hypotheses, (hypothesis) => {
    const db = _.reduce(hypothesis.evidence, (db, evidence) => db + evidence.db, 0)
    hypothesis.weight = db / totalDbs
  })
}

const initialState = {
  observations:   {},
  evidence:       {},
  hypotheses:     {},
}

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
    updateHypothesisWeights(state.hypotheses)
  } else if(action.type === "CreateHypothesis") {
    const id                  = createUUID()
    const description         = action.description
    const hypothesis          = { id, description, evidence: [], weight: 1000 }
    state.hypotheses[id]      = hypothesis
    updateHypothesisWeights(state.hypotheses)
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
    const id         = createUUID()
    const hypothesis = state.hypotheses[action.hypothesisId]
    if(hypothesis) {
      hypothesis.evidence.push({ id: id, description: action.description, db: 2 })
    }
    updateHypothesisWeights(state.hypotheses)
  } else if(action.type === "IncrementEvidenceDb") {
    const hypothesis = state.hypotheses[action.hypothesisId]
    if(hypothesis) {
      const evidence = _.find(hypothesis.evidence, (e) => e.id === action.evidenceId)
      evidence.db += 1
    }
    updateHypothesisWeights(state.hypotheses)
  } else if(action.type === "DecrementEvidenceDb") {
    const hypothesis = state.hypotheses[action.hypothesisId]
    if(hypothesis) {
      const evidence = _.find(hypothesis.evidence, (e) => e.id === action.evidenceId)
      evidence.db -= 1
    }
    updateHypothesisWeights(state.hypotheses)
  } else if(action.type === "ClearState") {
    state = initialState
  } else {
    console.log("Action not impelmented.", action)
  }

  window.localStorage.setItem("state", JSON.stringify(state))
  return state
}

export const clearState = () => {
  return {
    type: "ClearState",
  }
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

export const incrementEvidenceDb = (hypothesisId, evidenceId, newDb) => {
  return {
    type: "IncrementEvidenceDb",
    hypothesisId,
    evidenceId,
  }
}

export const decrementEvidenceDb = (hypothesisId, evidenceId, newDb) => {
  return {
    type: "DecrementEvidenceDb",
    hypothesisId,
    evidenceId,
  }
}

export const createStore = () => {
  const savedState = window.localStorage.getItem("state")

  if(savedState) {
    return Redux.createStore(reducer, JSON.parse(savedState))
  } else {
    window.localStorage.setItem("state", JSON.stringify(initialState))
    return Redux.createStore(reducer, initialState)
  }
}
