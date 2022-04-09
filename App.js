import 'react-native-gesture-handler';//install
import 'expo-asset';//install

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';

import React, { Component } from 'react';

import Root from './Root';

const store = createStore(rootReducer, applyMiddleware(thunk))

export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  render() {
  return (
    <Provider store={store}>
      <Root navegation={this.props.navegation}/>
    </Provider>
  )
  }
}

export default App
