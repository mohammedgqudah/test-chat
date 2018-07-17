import React, { Component } from 'react';
import './chat-server.scss';
import Section from '../server-section/server-section.jsx';
import { Route } from 'react-router-dom';
import ChatBox from '../chat-box/chat-box.jsx';
class ChatServer extends Component {
    constructor(props) {
        super(props);
        this.server_id = this.props.match.params.server_id;
        this.server = this.props.store.servers.find(
            s => s._id == this.server_id
        );
    }
    onSendMessage() {}
    render() {
        let { server } = this;
        return (
            <div className="ChatServer row">
                <div className="col-md-2 sections" style={{ height: '100%' }}>
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
                        render={() => (
                            <ChatBox
                                {...this.props}
                                onSendMessage={this.onSendMessage}
                            />
                        )}
                    />
                </div>
                <div className="col-md-2 users" style={{ height: '100%' }} />
            </div>
        );
    }
}
export default ChatServer;
