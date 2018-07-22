import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from '../form/form.jsx';
import Input from '../input/input.jsx';
import Login from '../login/login.jsx';
import ChatMain from '../chat-main/chat-main.jsx';
class AppMain extends Component {
    componentDidMount() {
        let { actions } = this.props;
        actions.FETCH_SERVERS();
    }
    render() {
        let { store } = this.props;
        return (
            <div style={{ height: '100%' }}>
                <Switch>
                    <Route
                        path="/login"
                        render={() => {
                            return <Login {...this.props} />;
                        }}
                    />
                    {store.load_app == 1 && (
                        <Route
                            path="/"
                            render={() => <ChatMain {...this.props} />}
                        />
                    )}
                </Switch>
                {store.load_app != 1 && 'loading'}
            </div>
        );
    }
}

export default AppMain;
