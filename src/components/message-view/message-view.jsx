import React, { Component } from 'react';
import './message-view.scss';
import shortNameToImage, { List } from '../EmojiParser/EmojiParser';
import moment from 'moment';
import marked from 'marked';
import UserCard from '../user-card/user-card.jsx';
import './theme-dark-code.scss';
import Prism from 'prismjs';
import { Markdown } from 'react-custom-markdown';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
class MessageView extends Component {
    constructor(props) {
        super(props);
        this.rules = this.rules.bind(this);
        this.renderer = this.renderer.bind(this);
        this.check_role = this.check_role.bind(this);
        this.check_user = this.check_user.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    componentDidMount() {
        let con = document.querySelector('#MessagesList > div');
        con = con.children[0];
        con.scrollTop =
            con.offsetHeight + this.ref.offsetHeight + con.scrollHeight;
    }
    rules() {
        return [
            { name: 'role_mention', regexp: /@([\s\S]+?)\./ },
            { name: 'emoji', regexp: /:([\s\S]+?):/ },
            { name: 'link', regexp: /-([\s\S]+?)-/ }
        ];
    }
    check_role(role) {
        let { roles } = this.props;
        return roles.map(r => r.name).includes(role);
    }
    check_user(name) {
        let { users } = this.props;
        return users.map(u => u.user.name).includes(name);
    }
    getUser(name) {
        let { users } = this.props;
        return users.find(u => u.user.name == name);
    }
    renderer({ rule, content }, props) {
        switch (rule) {
            case 'role_mention': {
                if (this.check_role(content)) {
                    return <span className="role">@{content}</span>;
                } else if (this.check_user(content)) {
                    let user = this.getUser(content);
                    return (
                        <UserCard
                            user={user.user}
                            user_roles={[]}
                            {...this.props}
                            pos="top"
                        >
                            <span className="mention user">@{content}</span>
                        </UserCard>
                    );
                } else return <span className="wrong_mention">@{content}</span>;
                break;
            }
            case 'emoji': {
                content = ':' + content + ':';
                if (List[content])
                    return (
                        <Tooltip
                            // options
                            title={content}
                            position="top"
                            trigger="mouseenter"
                            animation="perspective"
                            arrow={true}
                        >
                            <img
                                alt={content}
                                class="emoji"
                                src={`https://abs.twimg.com/emoji/v2/svg/${
                                    List[content].uc_base
                                }.svg`}
                            />
                        </Tooltip>
                    );
                return <span className="string">{content}</span>;
                break;
            }
            case 'link': {
                return (
                    <a href={content} target="_blank">
                        link
                    </a>
                );
                break;
            }
        }
    }
    render() {
        let { message, store, server } = this.props;
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
                    <p className="text">
                        <Markdown
                            customRules={this.rules()}
                            customElementsRenderer={this.renderer}
                        >
                            {message.content}
                        </Markdown>
                    </p>
                </div>
            </div>
        );
    }
}

export default MessageView;
