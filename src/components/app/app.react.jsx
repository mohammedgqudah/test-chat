import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import store from '../../store/store';
import actions from './actions';
import './app.scss';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import AppMain from '../app-main/app_main.jsx';
require('babel-core/register');
require('babel-polyfill');
let listened = false;
window.socket = io();
@connect(
    store => {
        return { store };
    },
    actions
)
class AppRoot extends Component {
    constructor(props) {
        super(props);
        if (!listened) {
            socket.on('SERVER_ACTION', action => {
                console.log('SERVER ACTION', action);
                this.props.dispatch(action);
            });
            listened = true;
        }
    }
    renderRoute({ history, match }) {
        window.router = history;
        return (
            <div className="main">
                <AppMain {...this.props} />
            </div>
        );
    }
    render() {
        return (
            <BrowserRouter basename="/app">
                <Switch>
                    <Route path="/" render={this.renderRoute.bind(this)} />
                </Switch>
            </BrowserRouter>
        );
    }
}
render(
    <Provider store={store}>
        <AppRoot />
    </Provider>,
    document.getElementById('root')
);
