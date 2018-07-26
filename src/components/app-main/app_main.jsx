import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from '../form/form.jsx';
import Input from '../input/input.jsx';
import Login from '../login/login.jsx';
import ChatMain from '../chat-main/chat-main.jsx';
let load_app = true;
let once = false;
class AppMain extends Component {
    componentDidMount() {
        let { actions, dispatch } = this.props;
        if (!once) {
            // socket.on('disconnect', () => {
            //     load_app = false;
            //     dispatch({ type: 'DISCONNECTED' });
            //     socket.connect('/app');
            // });
            // socket.on('connection', () => {
            //     console.log('connected');
            //     load_app = true;
            //     dispatch({ type: 'CONNECTED' });
            // });
            once = true;
        }
        // init application
        actions.FETCH_SERVERS();
        actions.FETCH_FRIENDS();
        actions.FETCH_PENDING_REQUESTS();
    }
    render() {
        let { store } = this.props;
        let load_app_number = 3;
        return (
            <div style={{ height: '100%' }}>
                <Switch>
                    <Route
                        path="/login"
                        render={() => {
                            return <Login {...this.props} />;
                        }}
                    />
                    {store.load_app == load_app_number &&
                        load_app && (
                            <Route
                                path="/"
                                render={() => <ChatMain {...this.props} />}
                            />
                        )}
                </Switch>
                {(store.load_app != load_app_number || !load_app) && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgb(245, 245, 245)'
                        }}
                    >
                        <img src="/static/img/loading.gif" alt="" />
                    </div>
                )}
            </div>
        );
    }
}

export default AppMain;
