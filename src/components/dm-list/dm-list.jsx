import React, { Component } from 'react';
import UserInfo from '../user-info/user-info.jsx';
import './dm-list.scss';
import * as _helper from '../_dm.helper';
import { NavLink as Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { group } from 'react-icons-kit/fa/group';
class Item extends Component {
    render() {
        let { conversation } = this.props;
        return (
            <Link
                to={`/@me/channel/${conversation._id}`}
                className={"dm-conversation-link " + this.props.className}
                activeClassName="active"
            >
                <div>
                    <img
                        src={conversation.other.avatar}
                        alt=""
                        className="user-picture"
                    />
                </div>
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <span className="name">{conversation.other.name}</span>
                </div>
            </Link>
        );
    }
}
class Friends extends Component {
    render() {
        return (
            <Link to={`/@me/friends`} className="dm-conversation-link">
                <div>
                    <Icon icon={group} size={20}/>
                </div>
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <span className="name">Friends</span>
                </div>
            </Link>
        );
    }
}
class DMList extends Component {
    render() {
        let { store } = this.props;
        return (
            <div className="DMList">
                <div className="header-search" />
                <div className="dm-users-list">
                    <Friends />
                    <span className="title">direct messages</span>
                    {store.dm.friends.map((conversation, idx) => {
                        conversation = _helper.conversationUsers(conversation);
                        return <Item conversation={conversation} className={`idx${idx}`}/>;
                    })}
                </div>
                <div className="user-info-con">
                    <UserInfo {...this.props} />
                </div>
            </div>
        );
    }
}
export default DMList;
