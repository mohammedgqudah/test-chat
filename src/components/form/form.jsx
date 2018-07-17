import React, { Component } from 'react';
import './form.scss';
import Button from '../buttons/button.jsx';
class Form extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        if (this.props.allowSubmit) this.props.onSubmit(e);
    }
    render() {
        let { title, children, allowSubmit } = this.props;
        return (
            <div className="Form" style={this.props.style}>
                <h3 className="title">{title}</h3>
                <form onSubmit={this.onSubmit}>
                    {children}
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            name={'login'}
                            type="submit"
                            extraClass={!allowSubmit && 'disabled'}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
export default Form;
