import React, { Component } from 'react';
import './message-view.scss';
import shortNameToImage from '../EmojiParser/EmojiParser';
import moment from 'moment';
import marked from 'marked';
import UserCard from '../user-card/user-card.jsx';

class MessageView extends Component {
    constructor(props) {
        super(props);
        this.message = this.message.bind(this);
    }
    componentDidMount() {
        let con = document.querySelector('#MessagesList > div');
        con = con.children[0];
        con.scrollTop =
            con.offsetHeight + this.ref.offsetHeight + con.scrollHeight;
    }
    message() {
        let { message, roles } = this.props;
        let content = message.content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        return shortNameToImage(marked(content)).replace(/@\w+/g, $ => {
            $ = $.replace('@', '');
            if (roles.find(r => r.name == $)) {
                return `<span class="tag">@${$}</span>`;
            }
            return `@${$}`;
        });
    }
    render() {
        let { message, store, server} = this.props;
        return (
            <div
                className={'MessageView ' + (message.fake && 'fake')}
                ref={ref => {
                    this.ref = ref;
                }}
            >
                <div className="message-info">
                    <UserCard
                        user={message.user}
                        user_roles={[]}
                        {...this.props}
                    >
                        <img
                            src={message.user.avatar}
                            alt={message.name}
                            className="user-profile-picture"
                        />
                    </UserCard>
                    <span className="info">
                        {message.user.name}
                        <span className="info-2">
                            @ {moment(message.createdAt).format('LTS')}
                        </span>
                    </span>
                </div>
                <div className="message-body">
                    <p
                        className="text"
                        dangerouslySetInnerHTML={{ __html: this.message() }}
                    />
                </div>
            </div>
        );
    }
}

export default MessageView;
