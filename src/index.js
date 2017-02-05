import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './App';
import * as Store from './Store.js'
import './index.css';

let store = Store.createStore()

store.dispatch(Store.addObservation({ id: "0", description: "This is observation number 0" }))
store.dispatch(Store.addObservation({ id: "1", description: "This is observation number 1" }))
store.dispatch(Store.addObservation({ id: "2", description: "This is observation number 2" }))
store.dispatch(Store.addObservation({ id: "3", description: "This is observation number 3" }))
store.dispatch(Store.addObservation({ id: "4", description: "This is observation number 4" }))
store.dispatch(Store.addObservation({ id: "5", description: "This is observation number 5" }))
store.dispatch(Store.addObservation({ id: "6", description: "This is observation number 6" }))

store.dispatch(Store.addEvidence({ id: "0", description: "This is description 0", reasons: ["This is observation number 0", "This is observation number 0"] }))
store.dispatch(Store.addEvidence({ id: "1", description: "This is description 1", reasons: ["This is observation number 1", "This is observation number 0", "This is observation number 0"] }))
store.dispatch(Store.addEvidence({ id: "2", description: "This is description 2", reasons: ["This is observation number 2" ] }))
store.dispatch(Store.addEvidence({ id: "3", description: "This is description 3", reasons: ["This is observation number 3", "This is observation number 0", "This is observation number 0", "This is observation number 0"] }))
store.dispatch(Store.addEvidence({ id: "4", description: "This is description 4", reasons: ["This is observation number 4","This is observation number 0"] }))
store.dispatch(Store.addEvidence({ id: "5", description: "This is description 5", reasons: ["This is observation number 5" ] }))
store.dispatch(Store.addEvidence({ id: "6", description: "This is description 6", reasons: ["This is observation number 6" ] }))

store.dispatch(Store.addHypothesis({ id: "0", description: "This is hypothesis 0", weight: 500 }))
store.dispatch(Store.addHypothesis({ id: "1", description: "This is hypothesis 1", weight: 333 }))
store.dispatch(Store.addHypothesis({ id: "2", description: "This is hypothesis 2", weight: 50 }))
store.dispatch(Store.addHypothesis({ id: "3", description: "This is hypothesis 3", weight: 786 }))

let render = (store, state) => {
  ReactDOM.render(
    <App store={store} state={state}/>,
    document.getElementById('root')
  )
}

render(store, store.getState())

store.subscribe(() => {
  render(store, store.getState())
})
