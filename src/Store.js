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
    state.command.description = ""
  } else if(action.type === "AddHypothesis") {
    state.hypotheses[action.hypothesis.id] = action.hypothesis
  } else if(action.type === "CreateHypothesis") {
    const id                  = createUUID()
    const description         = action.description
    const hypothesis          = { id, description, weight: 1000 }
    state.hypotheses[id]      = hypothesis
    state.command.description = ""
  } else if(action.type === "AddConsideration") {
    state.considerations[action.consideration.id] = action.consideration
  } else if(action.type === "UpdateCommand") {
    state.command = action.command
  } else if(action.type === "SetCommandToAddObservations") {
    state.command = { type: "AddObservation", description: "" }
  } else if(action.type === "SetCommandToChangeConsiderations") {
    state.command = { type: "ChangeConsiderations" }
  }

  return state
}

const initialState = {
  observations:   {},
  considerations: {},
  hypotheses:     {},
  command: {
    type: "AddHypothesis",
    description: "",
  },
}

export const setCommandToAddObservations = () => {
  return { type: "SetCommandToAddObservations" }
}

export const setCommandToChangeConsiderations = () => {
  return { type: "SetCommandToChangeConsiderations" }
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

export const addConsideration = (consideration) => {
  return {
    type:          "AddConsideration",
    consideration: consideration,
  }
}

export const updateCommand = (command) => {
  return {
    type:    "UpdateCommand",
    command: command,
  }
}

export const createStore = () => {
  return Redux.createStore(reducer, initialState)
}
