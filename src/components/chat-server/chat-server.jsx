import React, { Component } from 'react';
import './chat-server.scss';
import Section from '../server-section/server-section.jsx';
import { Route } from 'react-router-dom';
import ChatBox from '../chat-box/chat-box.jsx';
import Loading from '../loading.jsx';
import ChatUsersList from '../chat-users-list/chat-users-list.jsx';
import ServerSettings from '../server-settings/server-settings.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import _strategies from '../strategies';
import UserInfo from '../user-info/user-info.jsx';

let serversRooms = [];
class ChatServer extends Component {
    constructor(props) {
        super(props);
        this.server_id = this.props.match.params.server_id;
        if (!serversRooms.includes(this.server_id)) {
            socket.emit('join', this.server_id);
            serversRooms.push(this.server_id);
        }
        this.onSendMessage = this.onSendMessage.bind(this);
        this.server = this.props.store.servers.find(
            s => s._id == this.server_id
        );
        let { dispatch } = this.props;
        dispatch({
            type: 'ACTIVATE_SERVER',
            payload: { server_id: this.server_id }
        });
        let { channel_id, server_id, section_id } = this.props.match.params;
        let { actions, store } = props;
        if (channel_id && !store.channels_messages[channel_id]) {
            actions.FIND_CHANNEL_MESSAGES({ server_id, channel_id });
        }
    }
    onSendMessage(value, { match }) {
        let { server_id, section_id, channel_id } = match.params;
        let { actions } = this.props;
        actions.SEND_SERVER_MESSAGE(value, {
            server_id,
            section_id,
            channel_id
        });
    }
    render() {
        let { server } = this;
        let { store, dispatch, actions } = this.props;
        let { channels_messages } = store;
        let strategies = _strategies(server);
        return (
            <div className="ChatServer row">
                <div
                    className="col-md-2 sections"
                    style={{ height: '100%', padding: 0 }}
                >
                    <div className="settings">
                        <ServerSettings server={server} {...this.props} />
                    </div>
                    <Scrollbars
                        className="sections-list"
                        style={{
                            width: '100%',
                            height: '86%',
                            paddingTop: 0
                        }}
                        autoHide
                    >
                        {server.sections.map(section => {
                            return (
                                <Section
                                    key={section._id}
                                    section={section}
                                    {...this.props}
                                    server_id={this.server_id}
                                />
                            );
                        })}
                    </Scrollbars>
                    <div className="current-user" style={{ height: '7%' }}>
                        <UserInfo server={server} {...this.props} />
                    </div>
                </div>
                <div className="col-md-8 main" style={{ height: '100%' }}>
                    <Route
                        exact
                        path="/channel/:server_id"
                        render={() => <p>Select a channel</p>}
                    />
                    <Route
                        exact
                        path="/channel/:server_id/:section_id/:channel_id"
                        render={({ match }) => {
                            let {
                                channel_id,
                                server_id,
                                section_id
                            } = match.params;
                            let channelName = store.servers
                                .find(s => s._id == server_id)
                                .sections.find(s => s._id == section_id)
                                .channels.find(c => c._id == channel_id).name;
                            return channels_messages[channel_id] ? (
                                <ChatBox
                                    activate_channel
                                    match={match}
                                    key={channel_id}
                                    welcome={`welcome to #${channelName}`}
                                    server={server}
                                    users={server.users}
                                    strategies={strategies}
                                    {...this.props}
                                    messages={
                                        channels_messages[
                                            match.params.channel_id
                                        ] || []
                                    }
                                    onSendMessage={this.onSendMessage}
                                    roles={server.roles}
                                >
                                    <span className="name">
                                        <span style={{ color: 'gray' }}>#</span>{' '}
                                        &nbsp;{channelName}
                                    </span>
                                </ChatBox>
                            ) : (
                                <Loading />
                            );
                        }}
                    />
                </div>
                <div
                    className="col-md-2 users"
                    style={{ height: '100%', padding: 0 }}
                >
                    <ChatUsersList
                        {...this.props}
                        users={server.users}
                        king={server.king}
                        server={server}
                        server_roles={server.roles}
                    />
                </div>
            </div>
        );
    }
}
export default ChatServer;
