import React, { Component } from 'react';
import './server-settings.scss';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import Modal from '../modal/modal.jsx';
import Input from '../input/input.jsx';
import Button from '../buttons/button.jsx';

class ServerSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { error: true };
        this.createSection = this.createSection.bind(this);
        this.hide = this.hide.bind(this);
        this.setSectionName = this.setSectionName.bind(this);
    }
    hide() {
        let { dispatch } = this.props;
        dispatch({ type: 'SET_CREATE_SECTION', payload: 0 });
    }
    setSectionName({ value, name }) {
        if (/./.test(value.trim())) {
            this.setState({ error: false, sectionName: value });
        } else this.setState({ error: true });
    }
    createSection() {
        let { actions, server } = this.props;
        actions.CREATE_SECTION(server._id, this.state.sectionName);
    }
    show() {
        let { dispatch } = this.props;
        dispatch({
            type: 'SET_CREATE_SECTION',
            payload: this.props.server._id
        });
    }
    render() {
        let { server, store } = this.props;
        let { error, show } = this.state;
        return (
            <div className="server-settings-component">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width:' 100%',
                        padding: '50px',
                        color: '#fff'
                    }}
                >
                    <span className="title">{server.name}</span>
                    <Icon icon={ic_add} style={{cursor: 'pointer'}} onClick={this.show.bind(this)} />
                </div>
                {store.show_create_section == server._id && (
                    <Modal hide={this.hide.bind(this)}>
                        <h3 className="header">Create a section</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                            }}
                        >
                            <div style={{ width: '60%' }}>
                                <Input
                                    onValue={this.setSectionName}
                                    name="server-name"
                                    match={/./}
                                />
                                <div
                                    style={{
                                        width: '100%',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Button
                                        name="create"
                                        onClick={this.createSection.bind(this)}
                                        extraClass={error && 'disabled'}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        );
    }
}
export default ServerSettings;
