import React, { Component } from 'react';
import Form from '../form/form.jsx';
import './login.scss';
import Input from '../input/input.jsx';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: {} };
        this.onValue = this.onValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        let { actions } = this.props;
        let { data } = this.state;
        actions.LOGIN(data.id, data.password);
    }
    onValue({ value, name }) {
        this.state.data[name] = value;
    }
    render() {
        let { auth } = this.props.store;
        return (
            <div className="Login">
                <Form
                    style={{ width: '30%', height: '65%' }}
                    title={'LOGIN'}
                    onSubmit={this.onSubmit}
                    allowSubmit={!auth.logging_in}
                >
                    <Input
                        onValue={this.onValue}
                        ph="Email or username"
                        name="id"
                        match={/./}
                    />
                    <Input
                        onValue={this.onValue}
                        ph="password"
                        name="password"
                        type="password"
                        match={/./}
                    />
                    <p className={auth.message.type + '-text'} style={{minHeight: '5px'}}>
                        {auth.message.message}
                    </p>
                </Form>
            </div>
        );
    }
}
export default Login;
