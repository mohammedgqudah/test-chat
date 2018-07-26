import React, { Component } from 'react';
import './dm-interface.scss';
import DMIList from '../dm-list/dm-list.jsx';
import ChatBox from '../chat-box/chat-box.jsx';
import * as dm_helpers from '../_dm.helper';
import Friends from '../friends/friends.jsx';
import _strategies from '../strategies';
import { Route } from 'react-router-dom';

let subscribed = [];
class DM extends Component {
    constructor(props) {
        super(props);
        let { conversation_id } = this.props;
        this.onSendMessage = this.onSendMessage.bind(this);
        if (!subscribed.includes(conversation_id)) {
            socket.emit('join', conversation_id);
            subscribed.push(conversation_id);
        }
    }
    onSendMessage(value) {
        let { actions, conversation_id } = this.props;
        actions.SEND_DM_MESSAGE(value, {
            conversation_id
        });
    }
    componentDidMount() {
        let { actions, conversation_id } = this.props;
        actions.FETCH_DM_MESSAGES(conversation_id);
    }
    render() {
        let { conversation_id, store } = this.props;
        let conversation = store.dm.friends.find(f => f._id == conversation_id);
        conversation = dm_helpers.conversationUsers(conversation);
        let { me, other } = conversation;
        let users = [{ user: me }, { user: other }];
        let strategies = _strategies({
            users: users,
            roles: []
        });
        return store.dm.dm_loaded[conversation_id] ? (
            <ChatBox
                welcome={
                    <span>
                        this is the beginning of direct messages history with @{
                            other.name
                        }
                    </span>
                }
                {...this.props}
                roles={[]}
                messages={store.dm.dm_messages[conversation_id]}
                onSendMessage={this.onSendMessage}
                strategies={strategies}
                users={users}
            >
                <span className="name">
                    <span style={{ color: 'gray' }}>@</span>&nbsp;{conversation.other.name}
                </span>
            </ChatBox>
        ) : (
            <div className="dm-loading">
                <span className="loading">LOADING</span>
            </div>
        );
    }
}
class DMInterface extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'ACTIVATE_SERVER',
            payload: { server_id: this.server_id }
        });
    }
    render() {
        let { store } = this.props;
        return (
            <div className="row DMInterface">
                <div className="col-md-2 DMIList-con">
                    <DMIList {...this.props} />
                </div>
                <div className="col-md-10 DMIBox" style={{ padding: 0 }}>
                    <Route
                        path="/@me/channel/:conversation_id"
                        render={({ match, history }) => {
                            let { conversation_id } = match.params;
                            return (
                                <DM
                                    conversation_id={conversation_id}
                                    {...this.props}
                                />
                            );
                        }}
                    />
                    <Route path="/@me/friends" render={() => {
                        return <Friends {...this.props}/>
                    }}/>
                </div>
            </div>
        );
    }
}
export default DMInterface;
