import react, { Component } from 'react';
import './form.scss';
import Button from '../buttons/button.jsx';
class Form extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        let { title, children, button } = this.props;
        return (
            <div className="Form">
                <div className="Header">
                    <h3 className="title">{title}</h3>
                    <form onSubmit={this.onSubmit}>
                        {children}
                        <Button name={button} type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}
