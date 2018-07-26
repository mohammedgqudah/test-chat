import React, { Component } from 'react';
import './chatServersNav.scss';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import Modal from '../modal/modal.jsx';
import Input from '../input/input.jsx';
import Button from '../buttons/button.jsx';

class Item extends Component {
    render() {
        let { server, path, store, dispatch, active } = this.props;
        let { _id } = server;
        let section_id = server.sections[0]._id;
        let channel_id = server.sections[0].channels[0]._id;
        if (store.servers_last_link[_id]) {
            section_id = store.servers_last_link[_id].section_id;
            channel_id = store.servers_last_link[_id].channel_id;
        }
        let section = server.sections[0];
        return (
            <Link
                className={
                    'Item ' +
                    this.props.className +
                    (!server.picture && ' blue ') +
                    (active && ' active ')
                }
                style={{ backgroundImage: `url('${server.picture}')` }}
                to={path || `/channel/${_id}/${section_id}/${channel_id}`}
            >
                {!server.picture && server.name.substr(0, 1)}
            </Link>
        );
    }
}
class ME extends Component {
    render() {
        return (
            <Link
                className={'Item blue ME'}
                style={{ backgroundImage: `url('/static/img/app_logo.png')`, backgroundSize: '70%'}}
                to={`/@me`}
            />
        );
    }
}
class AddServer extends Component {
    constructor(props) {
        super(props);
        this.state = { error: true };
        this.addServer = this.addServer.bind(this);
        this.setServerName = this.setServerName.bind(this);
        this.createServer = this.createServer.bind(this);
    }
    addServer(event) {
        let { dispatch } = this.props;
        dispatch({ type: 'SET_CREATE_SERVER', payload: true });
    }
    componentDidMount() {
        let { dispatch } = this.props;
        this.hide = () => {
            dispatch({ type: 'SET_CREATE_SERVER', payload: false });
        };
    }
    setServerName({ value }) {
        if (/./.test(value.trim())) {
            this.setState({ error: false, name: value });
        } else {
            this.setState({ error: true });
        }
    }
    createServer() {
        let { actions } = this.props;
        actions.CREATE_SERVER(this.state.name);
    }
    render() {
        let { error } = this.state;
        let { show_create_server } = this.props.store;
        return (
            <div className={'Item add-server'} onClick={this.addServer}>
                <Icon icon={ic_add} />
                {show_create_server && (
                    <Modal hide={this.hide}>
                        <h3 className="header">Create server</h3>
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
                                    onValue={this.setServerName}
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
                                        onClick={this.createServer}
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
export default Item;
export { ME };
export { AddServer };
