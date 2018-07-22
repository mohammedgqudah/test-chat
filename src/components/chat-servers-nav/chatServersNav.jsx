import React, { Component } from 'react';
import './chatServersNav.scss';
import Item, { ME, AddServer} from './chat-server-item.jsx';

class ChatServerNav extends Component {
    render() {
        let { servers, active_server} = this.props.store;
        return (
            <div className="ChatServerNav">
                <div>
                    <ME /* The friends link on top of servers*//>
                    {servers.map(server => {
                        return <Item key={server._id} active={active_server == server._id} server={server} {...this.props}/>;
                    })}
                    <AddServer {...this.props}/>
                </div>
            </div>
        );
    }
}

export default ChatServerNav;
