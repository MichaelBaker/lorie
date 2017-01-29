import React, { Component } from 'react'
import * as Store           from './Store.js'

const renderAddHypothesis = (store, command) => {
  const handleChange     = (event) => store.dispatch({type: "UpdateCommand", command: { ...command, description: event.target.value }})
  const addHypothesis    = (event) => {
    event.preventDefault()
    store.dispatch(Store.createHypothesis(command.description))
  }
  const goToObservations = (event) => {
    event.preventDefault()
    store.dispatch(Store.setCommandToAddObservations())
  }

  return (
    <div>
      <h2>Add Hypotheses</h2>
      <p>Add all of the explanations for you problem that you can think of.</p>
      <p>If you're currently stuck, make sure you're not ignoring possible explanations that you haven't considered yet, even if they might seem implausible.</p>
      <p>Once you've added everything you can think of, continue on to adding observations.</p>
      <form onSubmit={addHypothesis}>
        <input type="text" value={command.description} onChange={handleChange} />
        <button type="submit">Add Hypothesis</button>
        <button onClick={goToObservations}>Continue to observations</button>
      </form>
    </div>
  )
}

const renderAddObservation = (store, command) => {
  const handleChange       = (event) => store.dispatch({type: "UpdateCommand", command: { ...command, description: event.target.value }})
  const addObservation     = (event) => {
    event.preventDefault()
    store.dispatch(Store.createObservation(command.description))
  }
  const goToConsiderations = (event) => {
    event.preventDefault()
    store.dispatch(Store.setCommandToChangeConsiderations())
  }

  return (
    <div>
      <h2>Add Observations</h2>
      <p>Add all of the data you have so far about the problem.</p>
      <p>Make sure you're not confusing things you've inferred from the data with the data itself. A observation is something you've literally witnessed. For instance, "The response to my request to http://www.example.com had a status code of 500" is an observation. "The web server returned a 500 status" is an inference you made about where the status code was generated and does not count.</p>
      <p>Once you've added everything you can think of, continue on to refining your considerations.</p>
      <form onSubmit={addObservation}>
        <input type="text" value={command.description} onChange={handleChange} />
        <button type="submit">Add Observation</button>
        <button onClick={goToConsiderations}>Continue to considerations</button>
      </form>
    </div>
  )
}

export default class CommandWindow extends Component {
  render() {
    const command     = this.props.command
    const commandType = command.type
    const store       = this.props.store

    if(commandType === "AddHypothesis") {
      return renderAddHypothesis(store, command)
    } else if(commandType === "AddObservation") {
      return renderAddObservation(store, command)
    } else {
      return <div>The command "{commandType}" hasn't been implemented yet.</div>
    }
  }
}

