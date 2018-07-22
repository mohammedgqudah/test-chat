import React, { Component } from 'react';
import MessageBox from '../message-box/MessageBox.jsx';
import './chat-box.scss';
import MessageView from '../message-view/message-view.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    onText(value) {
        this.setState({ messageBoxValue: value });
    }
    onKeyPress(evt) {
        if (evt.which == 13 && !evt.shiftKey) {
            evt.preventDefault();
            let message = this.state.messageBoxValue;
            this.setState({ messageBoxValue: '' });
            let { onSendMessage } = this.props;
            onSendMessage(this.state.messageBoxValue, this.props);
        }
    }
    onScroll(a, b) {
        // console.log(a, b);
    }
    render() {
        let { messages, children } = this.props;
        let { messageBoxValue } = this.state;
        return (
            <div className="ChatBox">
                <div className="header">{children}</div>
                <div className="Messages" id="MessagesList">
                    <Scrollbars
                        style={{ height: '100%', width: '100%' }}
                        onScroll={this.onScroll}
                        className="TEST"
                        id="ID"
                    >
                        {messages.map(m => {
                            return (
                                <MessageView
                                    key={m._id}
                                    message={m}
                                    {...this.props}
                                />
                            );
                        })}
                    </Scrollbars>
                </div>
                <div className="ChatFooter">
                    <MessageBox
                        text={this.onText.bind(this)}
                        width="80%"
                        value={messageBoxValue}
                        onKeyPress={this.onKeyPress}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}
export default ChatBox;
