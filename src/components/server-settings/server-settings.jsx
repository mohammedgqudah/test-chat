import React, { Component } from 'react';
import './server-settings.scss';
class ServerSettings extends Component {
    render() {
        let { server } = this.props;
        return (
            <div className="server-settings-component">
                <span className="title">{server.name}</span>
            </div>
        );
    }
}
export default ServerSettings;
