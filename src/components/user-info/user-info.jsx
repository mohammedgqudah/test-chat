import React, { Component } from 'react';
import './user-info.scss';
import Icon from 'react-icons-kit';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { ic_mic } from 'react-icons-kit/md/ic_mic';
import { ic_headset } from 'react-icons-kit/md/ic_headset';

class UserInfo extends Component {
    render() {
        return (
            <div className="UserInfo">
                <div className="user">
                    <img
                        src={localStorage.getItem('USER_AVATAR')}
                        alt=""
                        className="user-img"
                    />
                    <span className="user-name">
                        {localStorage.getItem('USER_NAME')}
                        <span
                            className="user-tag"
                            style={{
                                display: 'block',
                                color: 'gray',
                                fontSize: '.5rem'
                            }}
                        >
                            #{localStorage.getItem('USER_TAG')}
                        </span>
                    </span>
                </div>
                <div className="settings-icons" style={{ color: 'gray' }}>
                    <Icon className="icon" icon={ic_settings} />
                    <Icon className="icon" icon={ic_mic} />
                    <Icon className="icon" icon={ic_headset} />
                </div>
            </div>
        );
    }
}
export default UserInfo;
