import React, { Component } from 'react';
import Form from '../form/form.jsx';
import './login.scss';
import Input from '../input/input.jsx';
import config from '../../../server/public/js/particlesjs-config.json';
let particlesJS = require('particlesjs');
console.log(particlesJS);
let time = false;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, small: false};
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
    componentDidMount() {
        particlesJS.init({
            color: ['#ffffff', '#4285f4'],
            selector: '#login-animation',
            maxParticles: 200,
            connectParticles: false
        });
        console.log(particlesJS);
    }
    componentDidUpdate () {
        let {store} = this.props;
        if (store.auth.logged_in) {
            this.setState({small: true});
            if (!time) {
                setTimeout(() => {
                    window.location = '/app'
                }, 3000);
                time = true;
            }
        }
    }
    render() {
        let { auth } = this.props.store;
        return (
            <div className="Login">
                <div className="flex">
                    <canvas id="login-animation" />
                    <div className="top">
                        <Form
                            style={{ width: '30%', height: '65%'}}
                            title={this.state.small ? 'connected' : 'LOGIN'}
                            className={this.state.small && 'animate_login'}
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
                            <p
                                className={auth.message.type + '-text'}
                                style={{ minHeight: '5px' }}
                            >
                                {auth.message.message}
                            </p>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
