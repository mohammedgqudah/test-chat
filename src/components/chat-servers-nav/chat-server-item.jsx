import React, { Component } from 'react';
import './chatServersNav.scss';
import { Link } from 'react-router-dom';

class Item extends Component {
    render() {
        let { server, path, store} = this.props;
        let {_id} = server;
        let section_id = server.sections[0]._id;
        let channel_id = server.sections[0].channels[0]._id;
        if (store.servers_last_link[_id]) {
            section_id = store.servers_last_link[_id].section_id;
            channel_id = store.servers_last_link[_id].channel_id;
        }
        let section = server.sections[0];
        return (
            <Link
                className={
                    'Item ' +
                    this.props.className +
                    (!server.picture && ' blue')
                }
                style={{ backgroundImage: `url('${server.picture}')` }}
                to={path || `/channel/${_id}/${section_id}/${channel_id}`}
            >
                {!server.picture && server.name.substr(0, 1)}
            </Link>
        );
    }
}
class ME extends Component {
    render() {
        return (
            <Link
                className={
                    'Item blue ME'
                }
                style={{ backgroundImage: `url('/static/img/friends.svg')` }}
                to={`/@me`}
            >
            </Link>
        );
    }
}

export default Item;
export { ME };
