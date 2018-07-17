import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Form from '../form/form.jsx';
import Input from '../input/input.jsx';
import Login from '../login/login.jsx';
import ChatMain from '../chat-main/chat-main.jsx';
class AppMain extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Route path="/" render={() => <ChatMain {...this.props} />} />
                <Route
                    path="/login"
                    render={() => {
                        return <Login {...this.props} />;
                    }}
                />
            </div>
        );
    }
}

export default AppMain;
