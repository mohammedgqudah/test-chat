import React, { Component } from 'react';
import './chat-users-list.scss';
import UserCard from '../user-card/user-card.jsx';
import SearchUsers from '../search-users/search-users.jsx';
class ChatUsersList extends Component {
    render() {
        let { users, server_roles, king } = this.props;
        return (
            <div className="users-list">
                <div className="search" >
                    <SearchUsers/>
                </div>
                <div className="users-list-component">
                    {users.map(({ user, roles, _id }) => {
                        return (
                            <UserCard
                                user={user}
                                user_roles={roles}
                                id={_id}
                                {...this.props}
                            >
                                <div className="ChatUser">
                                    <img
                                        src={user.avatar}
                                        className={'user'}
                                        alt={user.name}
                                    />
                                    <p>{user.name}</p>
                                    {king == user._id && (
                                        <img
                                            src="https://abs.twimg.com/emoji/v2/svg/1f451.svg"
                                            className="crown"
                                        />
                                    )}
                                </div>
                            </UserCard>
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default ChatUsersList;
