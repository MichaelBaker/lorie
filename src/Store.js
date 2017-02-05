import * as Redux from 'redux'
import createUUID from 'uuid/v4'

const reducer = (state, action) => {
  if(action.type === "AddObservation") {
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
    const hypothesis          = { id, description, weight: 1000 }
    state.hypotheses[id]      = hypothesis
  } else if(action.type === "AddEvidence") {
    state.evidence[action.evidence.id] = action.evidence
  }

  return state
}

const initialState = {
  observations:   {},
  evidence:       {},
  hypotheses:     {},
}

export const addObservation = (observation) => {
  return {
    type:        "AddObservation",
    observation: observation,
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

export const addHypothesis = (hypothesis) => {
  return {
    type:       "AddHypothesis",
    hypothesis: hypothesis,
  }
}

export const addEvidence = (evidence) => {
  return {
    type:     "AddEvidence",
    evidence: evidence,
  }
}

export const createStore = () => {
  return Redux.createStore(reducer, initialState)
}
