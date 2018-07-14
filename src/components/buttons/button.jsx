import react, { Component } from 'react';
import './button.scss';
class Button extends Component {
    render() {
        let { name, extraClass } = this.props;
        return (
            <button {...this.props} className={'Button ' + extraClass}>
                {name}
            </button>
        );
    }
}
export default Button;
