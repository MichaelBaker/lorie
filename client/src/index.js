import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './App';
import * as Store from './Store.js'
import './index.css';

let store = Store.createStore()

store.dispatch(Store.addHypothesis({ id: "",  description: "An alternative you haven't considered yet", evidence: [{ id: "", description: "Your unstated assumptions", db: 20 }], weight: 0, isDefault: true }))

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
