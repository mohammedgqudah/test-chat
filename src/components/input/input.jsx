import react, { Component } from 'react';
import './input.scss';
class Input extends Component {
    render() {
        let { type, error } = this.props;
        return (
            <div className="InputGroup">
                <input
                    type={type || 'text'}
                    {...this.props}
                    className="Input"
                />
                <p className="Error">{error || ''}</p>
            </div>
        );
    }
}
export default Input;
