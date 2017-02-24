import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from './App';
import * as Store from './Store.js'
import './index.css';

let store = Store.createStore()

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
