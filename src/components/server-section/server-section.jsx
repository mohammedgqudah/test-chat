import React, { Component } from 'react';
import './server-section.scss';
import { NavLink as Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import Modal from '../modal/modal.jsx';
import Input from '../input/input.jsx';
import Button from '../buttons/button.jsx';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

class Channel extends Component {
    render() {
        let { channel, folding } = this.props;
        let { name } = channel;
        let { server_id, section_id } = this.props;
        let channel_id = channel._id;
        return (
            <Link
                to={`/channel/${server_id}/${section_id}/${channel_id}`}
                className={
                    'section-channel ' +
                    (folding && !channel.active && ' fold')
                }
                activeClassName="active"
            >
                <div style={{ height: '100%', width: '100%' }}>
                    <span className="hash">#&nbsp;&nbsp;</span>
                    {name}
                </div>
            </Link>
        );
    }
}
class ServerSection extends Component {
    constructor(props) {
        super(props);
        this.state = { error: true };
        this.setChannelName = this.setChannelName.bind(this);
    }
    fold() {
        let { dispatch, section } = this.props;
        dispatch({
            type: 'FOLD_SECTION',
            payload: { section_id: section._id }
        });
    }
    openCreateChannel() {
        let { dispatch, section, store } = this.props;
        dispatch({
            type: 'SET_CREATE_CHANNEL',
            payload: section._id
        });
    }
    hide() {
        let { dispatch, section, store } = this.props;
        dispatch({
            type: 'SET_CREATE_CHANNEL',
            payload: 0
        });
    }
    createChannel() {
        let { actions, server_id, section } = this.props;
        let { channelName } = this.state;
        actions.CREATE_CHANNEL(server_id, section._id, channelName);
    }
    setChannelName({ value, name }) {
        if (/./.test(value.trim())) {
            this.setState({ channelName: value, error: false });
        } else {
            this.setState({ error: true });
        }
    }
    render() {
        let { section, store } = this.props;
        let { add_channel_section_id } = store;
        let { name } = section;
        let folding = store.folding_sections[section._id];
        let { error } = this.state;
        return (
            <div className="ServerSection">
                <p className="section-name">
                    <span onClick={this.fold.bind(this)}>
                        <img
                            className={'expand_more ' + (folding && 'fold')}
                            src="/static/img/expand_more.svg"
                            alt=""
                        />
                    </span>
                    <span className="flex">
                        <span onClick={this.fold.bind(this)}>&nbsp;{name}</span>
                        <Icon
                            icon={ic_add}
                            onClick={this.openCreateChannel.bind(this)}
                        />
                    </span>
                    {add_channel_section_id == section._id && (
                        <Modal hide={this.hide.bind(this)}>
                            <h3 className="header">Create Channel</h3>
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
                                        onValue={this.setChannelName}
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
                                            onClick={this.createChannel.bind(
                                                this
                                            )}
                                            extraClass={error && 'disabled'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )}
                </p>
                {section.channels.map((channel, idx) => (
                    <Channel
                        key={channel._id}
                        folding={folding}
                        {...this.props}
                        channel={channel}
                        section_id={section._id}
                        idx={'idx' + idx}
                    />
                ))}
            </div>
        );
    }
}

export default ServerSection;
