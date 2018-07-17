import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from '../../store/store';
import actions from './actions';
import './app.scss';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import AppMain from '../app-main/app_main.jsx';

@connect(
  store => {
    return { store };
  },
  actions
)
class AppRoot extends Component {
  renderRoute ({history, match}) {
    window.router = history;
    return (
      <div className="main">
        <AppMain {...this.props}/>
      </div>
    )
  }
  render() {
    return (
      <BrowserRouter basename="/app">
        <Switch>
          <Route path="/" render={this.renderRoute.bind(this)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById('root')
);
