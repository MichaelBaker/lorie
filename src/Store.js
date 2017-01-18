import * as Redux from 'redux'

let reducer = (state, action) => {
  if(action.type === "AddObservation") {
    state.observations[action.observation.id] = action.observation
  } else if(action.type === "AddHypothesis") {
    state.hypotheses[action.hypothesis.id] = action.hypothesis
  } else if(action.type === "AddConsideration") {
    state.considerations[action.consideration.id] = action.consideration
  }

  return state
}

let initialState = {
  observations:   {},
  considerations: {},
  hypotheses:     {},
}

export let addObservation = (observation) => {
  return {
    type:        "AddObservation",
    observation: observation,
  }
}

export let addHypothesis = (hypothesis) => {
  return {
    type:       "AddHypothesis",
    hypothesis: hypothesis,
  }
}

export let addConsideration = (consideration) => {
  return {
    type:          "AddConsideration",
    consideration: consideration,
  }
}

export let createStore = () => {
  return Redux.createStore(reducer, initialState)
}
