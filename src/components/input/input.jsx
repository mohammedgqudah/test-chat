import React, { Component } from 'react';
import './input.scss';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onBlur(evt) {
        let { match } = this.props;
        if (!match.test(evt.target.value.trim()))
            this.setState({ className: 'danger' });
        else this.setState({ className: 'success' });
    }
    render() {
        let { type, error, ph, name, pClassName } = this.props;
        let { className } = this.state;
        if (pClassName) className = pClassName;
        return (
            <div className="InputGroup">
                <input
                    type={type || 'text'}
                    {...this.props}
                    className={'Input ' + className}
                    onChange={e => {
                        this.onBlur(e);
                        this.props.onValue({ value: e.target.value, name });
                    }}
                    onBlur={this.onBlur.bind(this)}
                    placeholder={ph}
                />
                <p className="Error">{error || ''}</p>
            </div>
        );
    }
}
export default Input;
