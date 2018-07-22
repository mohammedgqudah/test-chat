import React, { Component } from 'react';
import './modal.scss';
class Modal extends Component {
    componentDidMount() {
        document
            .querySelector('.backdrop')
            .addEventListener('click', this.props.hide);
    }
    render() {
        return (
            <div className="modal-container">
                <div className="backdrop" />
                <div className="Modal">{this.props.children}</div>
            </div>
        );
    }
}
export default Modal;
