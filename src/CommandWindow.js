import React, { Component } from 'react'
import * as Store           from './Store.js'

export default class CommandWindow extends Component {
  render() {
    const command     = this.props.command
    const commandType = command.type
    const store       = this.props.store

    if(commandType === "AddHypothesis") {
      const handleChange  = (event) => store.dispatch({type: "UpdateCommand", command: { ...command, description: event.target.value }})
      const addHypothesis = (event) => store.dispatch(Store.createHypothesis(command.description))

      return (
        <div>
          <h2>Add Hypotheses</h2>
          <p>Add all of the explanations for you problem that you can think of.</p>
          <p>If you're currently stuck, make sure you're not ignoring possible explanations that you haven't considered yet, even if they might seem implausible.</p>
          <input type="text" value={command.description} onChange={handleChange} />
          <button onClick={addHypothesis}>Add Hypothesis</button>
        </div>
      )
    }
  }
}

