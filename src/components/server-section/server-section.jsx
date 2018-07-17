import React, { Component } from 'react';
import './server-section.scss';
import { Link } from 'react-router-dom';
class Channel extends Component {
    onClick() {
        let { server_id, section_id } = this.props;
        let channel_id = this.props.channel._id;
        this.props.dispatch({
            type: 'ACTIVATE_CHANNEL',
            payload: {
                server_id,
                section_id,
                channel_id
            }
        });
    }
    render() {
        let { channel, folding} = this.props;
        let { name } = channel;
        let { server_id, section_id } = this.props;
        let channel_id = channel._id;
        return (
            <Link
                to={`/channel/${server_id}/${section_id}/${channel_id}`}
                className={'section-channel ' + (channel.active && 'active')}
                style={{display: ((folding && !channel.active) && 'none')}}
            >
                <div
                    onClick={this.onClick.bind(this)}
                    style={{ height: '100%', width: '100%' }}
                >
                    <span className="hash">#&nbsp;&nbsp;</span>
                    {name}
                </div>
            </Link>
        );
    }
}
class ServerSection extends Component {
    fold () {
        let {dispatch, section} = this.props;
        dispatch({type: 'FOLD_SECTION', payload: {section_id: section._id}})
    }
    render() {
        let { section, store} = this.props;
        let { name } = section;
        let folding = store.folding_sections[section._id];
        return (
            <div className="ServerSection">
                <p className="section-name">
                    <span onClick={this.fold.bind(this)}>
                        <img className={"expand_more " + (folding && 'fold')} src="/static/img/expand_more.svg" alt=""/>
                    </span>&nbsp;{name}
                </p>
                {section.channels.map((channel, idx) => (
                    <Channel
                        key={channel._id}
                        folding={folding}
                        {...this.props}
                        channel={channel}
                        section_id={section._id}
                        idx={'idx' + idx}
                    />
                ))}
            </div>
        );
    }
}

export default ServerSection;
