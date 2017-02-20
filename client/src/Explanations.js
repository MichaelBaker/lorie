import React, { Component } from 'react'
import * as Style           from './Style.js'

const ExplanationsStyle = {
  display:       'flex',
  flex:          '1 1',
  flexDirection: 'row',
}

const Explanation = {
  color:      'black',
  fontFamily: 'lovatolight',
  ...Style.Column,
}

class Explanations extends Component {
  render() {
    const state = this.props.state
    const store = this.props.store

    return (
      <div style={ExplanationsStyle}>
        <div style={Explanation}>
          <p>
            Observations are simply facts that you've observed.
          </p>
          <p>
            You generally gather observations by performing experiments. It's important to record only your raw observations. As an example, if you observe the sound of a dog barking coming from the next room, you want to record "Sound of dog barking coming from the next room" and not "Dog in the next room".
          </p>
          <p>
            The latter is an inference you're making about your observation and you could be wrong. It could be that the T.V. is on and that's the origin of the sound. Recording only your raw observations protects you from this very common error.
          </p>
        </div>
        <div style={Explanation}>
          <p>
            Evidence is something you've learned that changes the weight of one or more hypotheses.
          </p>
          <p>
            You create evidence by thinking about what your observations are telling you about the world.
          </p>
          <p>
            When you think you've learned something valuable from your observations, you create a piece of evidence by dragging the observation onto 'New Evidence'. Once you've created a piece of evidence you can give it a description and add more observations to it.
          </p>
          <p>
            You can then drag a piece of evidence onto one or more hypotheses in order to change their weights.
          </p>
        </div>
        <div style={Explanation}>
          <p>
            A hypothesis is a possible explanation for the phenomenon that you're trying to model.
          </p>
          <p>
            The objective of the scientific method is to figure out what good hypotheses might be and then to determine which of your hypotheses best explains the phenomenon you're seeing.
          </p>
          <p>
            Once you have some hypotheses, you perform experiments in order to figure out which have the best predictive power. Adding evidence to a hypothesis allows you to change how likely that hypothesis is to be a good one.
          </p>
          <p>
            A hypothesis that correctly predicts a piece of evidence gets its weight increased. A hypothesis that fails to predict a piece of evidence gets its weight decreased.
          </p>
        </div>
      </div>
    );
  }
}

export default Explanations
